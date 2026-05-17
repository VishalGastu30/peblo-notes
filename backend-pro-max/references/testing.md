# Backend Testing Reference

## Testing Strategy

```
Unit Tests      → Business logic, utilities, pure functions (fast, no I/O)
Integration Tests → API endpoints with real DB (most valuable for backends)
E2E Tests       → Critical user flows (login → create → retrieve → delete)
```

**Minimum viable test suite**: Integration tests on all API endpoints.  
Don't over-test CRUD — focus on edge cases, auth, validation, and business rules.

---

## Node.js Testing (Vitest + Supertest)

### Setup
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    setupFiles: ['./tests/setup.ts'],
    globalSetup: ['./tests/global-setup.ts'],
  },
});
```

```typescript
// tests/setup.ts
import { prisma } from '../src/db';

beforeEach(async () => {
  // Clean DB before each test (use transactions or truncate)
  await prisma.$transaction([
    prisma.post.deleteMany(),
    prisma.user.deleteMany(),
  ]);
});

afterAll(async () => {
  await prisma.$disconnect();
});
```

### Integration Test Pattern
```typescript
// tests/users.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import supertest from 'supertest';
import { app } from '../src/app';
import { prisma } from '../src/db';

const request = supertest(app);

describe('POST /api/v1/users', () => {
  it('creates a user with valid data', async () => {
    const res = await request
      .post('/api/v1/users')
      .send({ email: 'test@example.com', password: 'password123', name: 'Test' });

    expect(res.status).toBe(201);
    expect(res.body.data).toMatchObject({
      email: 'test@example.com',
      name: 'Test',
    });
    expect(res.body.data.password).toBeUndefined(); // Never return password
    expect(res.body.data.id).toBeDefined();
  });

  it('returns 422 for invalid email', async () => {
    const res = await request
      .post('/api/v1/users')
      .send({ email: 'not-an-email', password: 'password123', name: 'Test' });

    expect(res.status).toBe(422);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });

  it('returns 409 for duplicate email', async () => {
    await prisma.user.create({
      data: { email: 'existing@example.com', name: 'Existing', passwordHash: 'hash' }
    });

    const res = await request
      .post('/api/v1/users')
      .send({ email: 'existing@example.com', password: 'password123', name: 'Test' });

    expect(res.status).toBe(409);
  });
});

describe('GET /api/v1/users/me', () => {
  it('returns current user with valid token', async () => {
    // Create user + generate token
    const token = await createTestUserAndToken();

    const res = await request
      .get('/api/v1/users/me')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.data.email).toBeDefined();
  });

  it('returns 401 without token', async () => {
    const res = await request.get('/api/v1/users/me');
    expect(res.status).toBe(401);
  });
});
```

### Test Helpers
```typescript
// tests/helpers.ts
import jwt from 'jsonwebtoken';
import { prisma } from '../src/db';

export const createTestUser = async (overrides = {}) => {
  return prisma.user.create({
    data: {
      email: 'test@example.com',
      name: 'Test User',
      passwordHash: 'hashed',
      ...overrides,
    },
  });
};

export const createTestUserAndToken = async () => {
  const user = await createTestUser();
  const token = jwt.sign({ sub: user.id, role: 'user' }, process.env.JWT_ACCESS_SECRET!, { expiresIn: '15m' });
  return { user, token };
};
```

---

## Python Testing (pytest + httpx)

### Setup
```python
# conftest.py
import pytest
from httpx import AsyncClient, ASGITransport
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from app.main import app
from app.core.database import Base, get_db

TEST_DATABASE_URL = "postgresql+asyncpg://postgres:postgres@localhost:5432/testdb"

@pytest.fixture(scope="function", autouse=True)
async def db_session():
    engine = create_async_engine(TEST_DATABASE_URL)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
    await engine.dispose()

@pytest.fixture
async def client():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        yield ac
```

### Test Pattern
```python
# tests/test_users.py
import pytest

@pytest.mark.asyncio
async def test_create_user_success(client):
    response = await client.post("/api/v1/users", json={
        "email": "test@example.com",
        "password": "password123",
        "name": "Test User"
    })
    assert response.status_code == 201
    data = response.json()["data"]
    assert data["email"] == "test@example.com"
    assert "password" not in data

@pytest.mark.asyncio
async def test_create_user_invalid_email(client):
    response = await client.post("/api/v1/users", json={
        "email": "not-valid",
        "password": "password123",
        "name": "Test"
    })
    assert response.status_code == 422
    assert response.json()["error"]["code"] == "VALIDATION_ERROR"

@pytest.mark.asyncio
async def test_get_me_requires_auth(client):
    response = await client.get("/api/v1/users/me")
    assert response.status_code == 401
```

---

## What to Test vs What to Skip

### Always Test
- All authentication flows (login, logout, refresh, protected routes)
- Input validation — valid data, invalid data, missing fields, boundary values
- Authorization — users can't access other users' data
- Business logic with branching conditions
- Error responses — correct HTTP status codes and error shapes
- Pagination — correct results, cursor/offset behavior

### Skip or Deprioritize
- Simple CRUD with no business logic (trust the ORM)
- Framework internals
- Third-party library behavior
- Trivial getters/setters

---

## Test Database Strategy

Options (pick one):
1. **Test DB per run** — create/drop schema in beforeEach/afterEach (slowest, safest)
2. **Transactions** — wrap each test in a transaction, rollback after (fast, recommended)
3. **Test containers** — spin up real Postgres in Docker (closest to production)

```typescript
// Transaction rollback pattern (Node.js/Prisma)
beforeEach(async () => {
  await prisma.$executeRaw`BEGIN`;
});

afterEach(async () => {
  await prisma.$executeRaw`ROLLBACK`;
});
```

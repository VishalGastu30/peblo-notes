# Database Design Reference

## Database Selection Guide

| Need | Recommended DB | Why |
|---|---|---|
| Relational data, most web apps | **PostgreSQL** | ACID, JSON support, full-text search, extensions |
| Simple/embedded/local | **SQLite** | Zero config, great for tools and small apps |
| Document-oriented, flexible schema | **MongoDB** | Good for content, catalogs, user-generated data |
| Time-series / metrics / IoT | **TimescaleDB** or **InfluxDB** | Optimized time queries, compression |
| Analytics / OLAP | **ClickHouse** or **DuckDB** | Columnar, blazing fast aggregations |
| Caching / sessions / pub-sub | **Redis** | In-memory, sub-ms latency |
| Full-text search | **Elasticsearch** or **Typesense** | Inverted index, faceting |
| Serverless-friendly relational | **PlanetScale**, **Neon**, **Turso** | Branching, edge-compatible |
| Graph data | **Neo4j** or **Amazon Neptune** | When relationships ARE the data |

**Default**: PostgreSQL for anything relational. Never use MongoDB as a default — it's a specific tool.

---

## PostgreSQL Schema Patterns

### Standard Table Structure
```sql
CREATE TABLE users (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT NOT NULL UNIQUE,
  name        TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  role        TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at  TIMESTAMPTZ  -- soft delete
);

-- Auto-update updated_at
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();
```

### Money: Always Use Integers
```sql
-- WRONG: floats lose precision
amount DECIMAL(10,2)

-- RIGHT: store as cents/pence
amount_cents INTEGER NOT NULL  -- 1999 = $19.99
currency     TEXT NOT NULL DEFAULT 'USD'
```

### Indexing Strategy
```sql
-- Always index foreign keys
CREATE INDEX idx_posts_user_id ON posts(user_id);

-- Index columns used in WHERE clauses
CREATE INDEX idx_users_email ON users(email);

-- Partial index for soft deletes (only index active records)
CREATE INDEX idx_users_active ON users(email) WHERE deleted_at IS NULL;

-- Composite index for common query patterns
CREATE INDEX idx_posts_user_created ON posts(user_id, created_at DESC);

-- Full-text search
CREATE INDEX idx_posts_search ON posts USING GIN(to_tsvector('english', title || ' ' || body));
```

### Useful PostgreSQL Features
```sql
-- JSONB for flexible attributes (better than separate table for simple cases)
attributes JSONB DEFAULT '{}',
CREATE INDEX idx_product_attrs ON products USING GIN(attributes);

-- Arrays
tags TEXT[] DEFAULT '{}',
CREATE INDEX idx_post_tags ON posts USING GIN(tags);

-- Enum types
CREATE TYPE order_status AS ENUM ('pending', 'processing', 'shipped', 'delivered', 'cancelled');
status order_status NOT NULL DEFAULT 'pending',

-- Constraints
CHECK (price > 0),
CHECK (end_date > start_date),
```

---

## Prisma (Node.js) Patterns

### Schema
```prisma
// schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String
  posts     Post[]
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")
  deletedAt DateTime? @map("deleted_at")

  @@map("users")
  @@index([email])
}

model Post {
  id        String   @id @default(uuid())
  title     String
  body      String
  userId    String   @map("user_id")
  user      User     @relation(fields: [userId], references: [id])
  createdAt DateTime @default(now()) @map("created_at")

  @@map("posts")
  @@index([userId])
}
```

### Query Patterns (Avoid N+1)
```typescript
// WRONG: N+1 problem
const users = await prisma.user.findMany();
for (const user of users) {
  const posts = await prisma.post.findMany({ where: { userId: user.id } });
}

// RIGHT: eager load with include
const users = await prisma.user.findMany({
  include: { posts: true }
});

// Cursor-based pagination (for feeds/timelines)
const posts = await prisma.post.findMany({
  take: 20,
  cursor: cursor ? { id: cursor } : undefined,
  skip: cursor ? 1 : 0,
  orderBy: { createdAt: 'desc' }
});

// Soft delete pattern
const user = await prisma.user.update({
  where: { id },
  data: { deletedAt: new Date() }
});

// Always filter soft-deleted
const activeUsers = await prisma.user.findMany({
  where: { deletedAt: null }
});
```

---

## SQLAlchemy (Python) Patterns

```python
# models/user.py
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from sqlalchemy import String, DateTime, func
from datetime import datetime
import uuid

class Base(DeclarativeBase):
    pass

class User(Base):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    email: Mapped[str] = mapped_column(String, unique=True, nullable=False, index=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    password_hash: Mapped[str] = mapped_column(String, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), onupdate=func.now())
    deleted_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
```

---

## Migrations Best Practices

- **Never edit the schema directly in production** — always use migrations
- One migration = one logical change
- Migrations must be reversible (include downgrade)
- Run migrations as part of deployment (before app starts)
- Test migrations on a copy of production data before deploying

### Prisma
```bash
npx prisma migrate dev --name add_users_table   # dev
npx prisma migrate deploy                         # production
```

### Alembic (Python)
```bash
alembic revision --autogenerate -m "add users table"
alembic upgrade head      # apply
alembic downgrade -1      # rollback one
```

---

## Connection Pooling (Critical for Production)

```typescript
// Prisma — configure in schema.prisma
datasource db {
  url = env("DATABASE_URL")
  // or use pgBouncer URL for serverless
}

// Prisma recommends single instance
const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL } }
});

// Export singleton
export { prisma };
```

For high-traffic apps, use **pgBouncer** in front of PostgreSQL.

---

## Common Mistakes

| Mistake | Fix |
|---|---|
| Storing money as FLOAT | Use INTEGER (cents) |
| No soft deletes | Add `deleted_at TIMESTAMPTZ` |
| Missing indexes on FKs | Add index on every FK column |
| Storing datetimes without timezone | Always use `TIMESTAMPTZ` / `DateTime(timezone=True)` |
| Unbounded queries | Always use `LIMIT` / `take` |
| SELECT * in production queries | Select only needed columns |
| String concatenation in SQL | Parameterized queries only |
| No migration strategy | Alembic / Prisma migrate from day one |
| Single DB connection (no pooling) | Connection pooling always |

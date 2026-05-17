# DevOps, Docker & CI/CD Reference

## Docker — Production-Ready Patterns

### Node.js Dockerfile (Multi-stage)
```dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine AS production
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY --from=builder /app/dist ./dist

USER appuser
EXPOSE 3000
CMD ["node", "dist/server.js"]
```

### Python Dockerfile (Multi-stage)
```dockerfile
FROM python:3.12-slim AS base
WORKDIR /app
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1

FROM base AS builder
RUN pip install --upgrade pip
COPY requirements.txt .
RUN pip install --prefix=/install -r requirements.txt

FROM base AS production
RUN adduser --disabled-password --gecos '' appuser
COPY --from=builder /install /usr/local
COPY . .
USER appuser
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4"]
```

### .dockerignore
```
node_modules/
.env
.env.*
*.log
dist/
__pycache__/
.pytest_cache/
.git/
README.md
```

---

## Docker Compose (Local Development)

```yaml
# docker-compose.yml
version: '3.9'

services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://postgres:postgres@db:5432/myapp
      REDIS_URL: redis://redis:6379
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_started
    volumes:
      - ./src:/app/src  # hot reload in dev

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
```

---

## Environment Management

### .env.example (commit this, never .env)
```env
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/myapp

# Redis
REDIS_URL=redis://localhost:6379

# Auth
JWT_ACCESS_SECRET=change-me-32-random-bytes
JWT_REFRESH_SECRET=change-me-different-32-random-bytes

# App
PORT=3000
NODE_ENV=development
LOG_LEVEL=debug
ALLOWED_ORIGINS=http://localhost:3000
```

### Secret Management by Environment
- **Local dev**: `.env` file (gitignored)
- **Staging/Production**: 
  - AWS: Secrets Manager / Parameter Store
  - GCP: Secret Manager
  - Heroku: Config Vars
  - Railway / Render: Environment Variables UI
  - Kubernetes: Secrets + external-secrets-operator

**Never**: hardcode secrets, commit `.env`, log secrets, pass secrets as URL params.

---

## GitHub Actions CI/CD

### Node.js Pipeline
```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: testdb
        ports:
          - 5432:5432
        options: --health-cmd pg_isready --health-interval 5s

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run build
      - run: npm run db:migrate
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/testdb
      - run: npm test
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/testdb
          JWT_ACCESS_SECRET: test-secret

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      # Add deployment step (Railway, Render, ECS, etc.)
```

---

## Health Check Endpoint (Required)

```typescript
// Always implement this
app.get('/health', async (req, res) => {
  const checks = {
    database: 'ok',
    redis: 'ok',
  };

  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch {
    checks.database = 'error';
  }

  try {
    await redis.ping();
  } catch {
    checks.redis = 'error';
  }

  const healthy = Object.values(checks).every(v => v === 'ok');
  res.status(healthy ? 200 : 503).json({
    status: healthy ? 'healthy' : 'degraded',
    checks,
    timestamp: new Date().toISOString(),
  });
});
```

---

## Logging Standards (Structured JSON)

```typescript
// Use pino (Node.js) — never console.log in production
import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  formatters: {
    level: (label) => ({ level: label }),
  },
});

// Log with context
logger.info({ userId: req.user.id, action: 'login' }, 'User logged in');
logger.error({ err: error, requestId: req.id }, 'Request failed');

// Never log: passwords, tokens, credit cards, SSNs
```

Log levels:
- `error`: System errors, exceptions that need investigation
- `warn`: Business rule violations, deprecated usage  
- `info`: Key business events (login, order created, payment processed)
- `debug`: Detailed flow (dev only, never in production)

---

## Production Deployment Checklist

- [ ] `NODE_ENV=production` (disables dev logging, etc.)
- [ ] All secrets in environment variables
- [ ] Database migrations run before app starts
- [ ] Health check endpoint at `/health`
- [ ] Non-root user in Docker container
- [ ] Docker image built with multi-stage (no dev dependencies)
- [ ] HTTPS enforced (TLS termination at load balancer/reverse proxy)
- [ ] Container resource limits set (CPU, memory)
- [ ] Graceful shutdown on SIGTERM (finish in-flight requests)
- [ ] Log aggregation configured (CloudWatch, Datadog, Logtail, etc.)
- [ ] Alerting on error rate and latency spikes

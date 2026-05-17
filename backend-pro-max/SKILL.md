---
name: backend-pro-max
description: Production-grade backend engineering intelligence for building robust, scalable, and secure server-side systems. Use this skill whenever the user asks to build an API, design a database schema, set up authentication, create microservices, write server-side code, build a REST or GraphQL API, implement background jobs, handle file uploads, set up caching, design a message queue, scaffold a backend project, implement rate limiting, write backend tests, configure Docker/CI/CD, or anything involving server-side architecture. Trigger even for casual phrases like "build the backend for X", "set up a server for Y", "make an API that does Z", "how should I structure my DB", or "help me with my Node/Python/Go/Rust backend". Always use this skill before writing any backend code — it provides reasoning rules, architecture patterns, stack-specific guidelines, security checklists, and anti-patterns that dramatically improve output quality.
---

# Backend Pro Max

A backend engineering intelligence skill that mirrors the design rigor of [UI UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) — but for the server side. Just as that skill auto-generates a tailored design system from a project description, this skill auto-generates a complete **Backend Architecture Blueprint** before writing any code.

---

## Core Workflow

When the user requests any backend work:

1. **Analyze the request** — identify the product type, scale requirements, and constraints
2. **Run the reasoning engine** — select the right architecture pattern, stack, data layer, and security posture from the tables below
3. **Output a Backend Blueprint** (see format below)
4. **Generate production-grade code** using the stack-specific guidelines in `references/`
5. **Run the pre-delivery checklist** before finishing

---

## Step 1 — Backend Blueprint Generation

Before writing a single line of code, output this blueprint (ASCII or Markdown):

```
+------------------------------------------------------------------------------+
|  TARGET: [Project Name] - RECOMMENDED BACKEND ARCHITECTURE                   |
+------------------------------------------------------------------------------+
|                                                                              |
|  PATTERN: [e.g., Monolith-First / Microservices / Serverless / BFF]         |
|     Rationale: [Why this fits the use case]                                  |
|     Scale Target: [Users, RPS, data volume]                                  |
|                                                                              |
|  STACK:                                                                      |
|     Runtime:    [Node.js / Python / Go / Rust / Java]                        |
|     Framework:  [Express / FastAPI / Gin / Actix / Spring Boot]              |
|     Database:   [PostgreSQL / MongoDB / MySQL / SQLite / DynamoDB]           |
|     Cache:      [Redis / Memcached / in-memory / none]                       |
|     Queue:      [BullMQ / Celery / RabbitMQ / SQS / none]                   |
|     Auth:       [JWT / Sessions / OAuth2 / API Keys / Auth0]                 |
|                                                                              |
|  API DESIGN:                                                                 |
|     Style:      [REST / GraphQL / gRPC / tRPC / WebSocket]                  |
|     Versioning: [URL path / Header / Query param]                            |
|     Pagination: [Cursor / Offset / Keyset]                                   |
|                                                                              |
|  DATA MODEL HIGHLIGHTS:                                                      |
|     [Key entities and relationships]                                          |
|     [Indexing strategy]                                                       |
|     [Migrations approach]                                                     |
|                                                                              |
|  SECURITY POSTURE:                                                           |
|     [Auth strategy, rate limiting, input validation, secrets management]     |
|                                                                              |
|  ANTI-PATTERNS TO AVOID:                                                     |
|     [Industry/scale-specific pitfalls]                                       |
|                                                                              |
|  PRE-DELIVERY CHECKLIST:                                                     |
|     [ ] Input validation on all endpoints                                    |
|     [ ] Passwords hashed (bcrypt/argon2, never MD5/SHA1)                    |
|     [ ] Secrets in env vars, never hardcoded                                 |
|     [ ] DB queries use parameterized statements (no SQL injection)           |
|     [ ] Rate limiting on auth + public endpoints                             |
|     [ ] Error responses never leak stack traces to clients                   |
|     [ ] Health check endpoint at /health or /ping                            |
|     [ ] Graceful shutdown handling                                           |
|     [ ] Structured logging (JSON) with correlation IDs                       |
|     [ ] API versioning strategy decided before first release                 |
+------------------------------------------------------------------------------+
```

---

## Step 2 — Architecture Reasoning Rules (55 Product Types)

Match the user's product to a category and apply the corresponding architecture defaults:

| Product Type | Pattern | Primary DB | Cache | Queue | Auth |
|---|---|---|---|---|---|
| **SaaS / B2B Platform** | Monolith-first → microservices at scale | PostgreSQL | Redis | BullMQ/SQS | JWT + OAuth2 |
| **Micro SaaS / Solo Product** | Monolith | SQLite or PostgreSQL | None | None | JWT |
| **E-commerce / Marketplace** | Modular monolith | PostgreSQL | Redis | BullMQ (orders, email) | JWT + OAuth2 |
| **Social Network / Feed** | Event-driven microservices | PostgreSQL + Redis | Redis | Kafka/SQS | JWT + OAuth2 |
| **Real-Time App (Chat/Collab)** | WebSocket-first + event sourcing | PostgreSQL + Redis | Redis Pub/Sub | Redis/Kafka | JWT |
| **Content / Blog / CMS** | Monolith or JAMstack backend | PostgreSQL | CDN + Redis | None | API Keys + OAuth2 |
| **Developer Tool / API Product** | REST or GraphQL API gateway | PostgreSQL | Redis | None | API Keys |
| **AI / ML Platform** | Async job-based | PostgreSQL + object store | Redis | Celery/BullMQ | JWT + API Keys |
| **Fintech / Banking** | Monolith with strict ACID | PostgreSQL | Redis (non-financial) | Kafka | JWT + MFA + OAuth2 |
| **Healthcare / HIPAA** | Monolith with audit log | PostgreSQL | Encrypted Redis | Audit queue | OAuth2 + MFA |
| **IoT / Telemetry** | Event-driven, time-series | TimescaleDB / InfluxDB | Redis | MQTT/Kafka | API Keys |
| **Gaming Backend** | Stateful + real-time | Redis (state) + PostgreSQL | Redis | WebSocket broker | JWT |
| **Booking / Scheduling** | Transactional monolith | PostgreSQL | Redis (availability) | BullMQ (reminders) | JWT + OAuth2 |
| **Media / Streaming** | CDN + async processing | PostgreSQL + object store | CDN | FFmpeg queue | JWT |
| **Analytics / BI Backend** | OLAP-optimized | ClickHouse / BigQuery / DuckDB | None | ETL pipeline | API Keys |
| **Mobile App Backend** | BFF (Backend for Frontend) | PostgreSQL | Redis | Push notification queue | JWT + refresh tokens |
| **Internal Tool / Admin** | Simple monolith | PostgreSQL or SQLite | None | None | Sessions or OAuth2 SSO |
| **Webhook / Integration Hub** | Event-driven + retry logic | PostgreSQL | Redis | BullMQ with dead-letter | API Keys |
| **Multi-tenant SaaS** | Shared DB with tenant isolation or DB-per-tenant | PostgreSQL | Redis per tenant | BullMQ | JWT with tenant claims |
| **Serverless / Edge** | Functions + managed DB | PlanetScale / Neon / D1 | KV store | SQS/EventBridge | JWT |
| **Web Scraper / Crawler** | Async worker pool | PostgreSQL | Redis (dedup) | BullMQ/Celery | API Keys |
| **Notification Service** | Event-driven microservice | PostgreSQL | Redis | SNS/SQS/BullMQ | Internal service auth |
| **Search Service** | Dedicated search layer | Elasticsearch / Typesense / Meilisearch | Redis | Index sync queue | API Keys |
| **File Storage Service** | Object storage + metadata DB | PostgreSQL + S3/R2/MinIO | CDN | Processing queue | JWT + presigned URLs |
| **Auth Service** | Dedicated auth microservice | PostgreSQL | Redis (sessions/tokens) | None | OAuth2 / OIDC |
| **Payment Backend** | Idempotent transactional | PostgreSQL | Redis (idempotency keys) | Webhook queue | JWT + webhook signing |
| **Education Platform** | Monolith or modular monolith | PostgreSQL | Redis | BullMQ (progress, certs) | JWT + OAuth2 |
| **HR / Ops Tool** | Simple CRUD monolith | PostgreSQL | None | Email queue | OAuth2 SSO |
| **Logistics / Supply Chain** | Event-driven + state machine | PostgreSQL | Redis | Kafka | JWT + API Keys |
| **Government / Public Service** | Monolith, strict compliance | PostgreSQL | None (or encrypted) | Audit queue | OAuth2 + MFA |

**Defaults for unknown types**: PostgreSQL + REST + JWT + Redis + Monolith-first.

---

## Step 3 — Stack-Specific Guidelines

Read the relevant reference file based on the chosen stack:

- `references/node-express.md` — Node.js + Express/Fastify patterns
- `references/node-nestjs.md` — NestJS architecture patterns
- `references/python-fastapi.md` — Python + FastAPI patterns
- `references/python-django.md` — Django REST framework patterns
- `references/go-gin.md` — Go + Gin/Echo patterns
- `references/rust-actix.md` — Rust + Actix-web patterns
- `references/databases.md` — DB schema design, indexing, migrations
- `references/auth.md` — Auth patterns (JWT, OAuth2, sessions, API keys)
- `references/devops.md` — Docker, CI/CD, environment management
- `references/testing.md` — Unit, integration, e2e testing patterns

Reference file format: `references/<stack>.md`  
Read only the relevant ones to keep context lean.

---

## Step 4 — Universal Backend Principles

Apply these regardless of stack or architecture:

### API Design
- Version APIs from day one: `/api/v1/` — never skip this
- Use HTTP methods semantically: GET (read), POST (create), PUT/PATCH (update), DELETE (remove)
- Return consistent error shapes: `{ error: { code, message, details } }`
- Return consistent success shapes: `{ data: ..., meta: { pagination? } }`
- Use 201 for creation, 204 for deletion, 422 for validation errors (not 400)
- Paginate all list endpoints — never return unbounded arrays
- Use cursor-based pagination for feeds/timelines, offset for admin tables

### Database
- Use an ORM or query builder, never raw string concatenation
- Always use parameterized queries / prepared statements
- Add indexes on: foreign keys, columns used in WHERE/ORDER BY, unique constraints
- Use DB migrations (never edit schema by hand in production)
- Soft-delete with `deleted_at` timestamps instead of hard deletes when audit matters
- Store money as integers (cents), never floats
- Store datetimes in UTC always

### Security Non-Negotiables
- Hash passwords with bcrypt (cost ≥ 12) or argon2id — NEVER MD5, SHA1, or SHA256 alone
- Rotate and expire JWT tokens (access: 15min, refresh: 7-30d)
- Validate and sanitize ALL user input — never trust client data
- Use environment variables for all secrets — never commit `.env` to git
- Set security headers: CORS, Helmet/equivalent, HSTS, CSP
- Rate limit authentication endpoints (e.g., 5 attempts/15min)
- Log all auth events (login, logout, failures, password resets)
- Never expose internal error details to API consumers

### Performance
- Cache expensive queries in Redis with appropriate TTLs
- Use connection pooling for all databases (pgBouncer, HikariCP, etc.)
- Run background jobs for anything that takes >100ms (email, image processing, webhooks)
- Use streaming for large file uploads/downloads
- Add database query timeouts to prevent long-running queries hanging servers
- Profile before optimizing — measure, don't guess

### Code Quality
- Keep controllers thin — business logic lives in services/use-cases
- Dependency injection over hardcoded dependencies
- Use DTOs / schema validation at API boundaries (Zod, Pydantic, Joi)
- Handle async errors explicitly — never swallow promise rejections
- Write integration tests for all API endpoints, unit tests for business logic
- Use structured JSON logging with request IDs for traceability

---

## Step 5 — Anti-Patterns by Product Type

| Anti-Pattern | When It Hurts Most | Correct Approach |
|---|---|---|
| Storing passwords in plaintext or weak hash | Always | bcrypt/argon2id |
| N+1 queries | Any relational DB | Eager loading / DataLoader |
| Returning full objects when only IDs needed | APIs with large payloads | Field selection / projections |
| Polling instead of webhooks/websockets | Real-time apps | Event-driven push |
| Synchronous heavy jobs in request handlers | E-commerce, media, AI | Queue + async workers |
| No pagination on list endpoints | Social, content, analytics | Cursor or offset pagination |
| Monolithic DB for event-sourced systems | Real-time, IoT, gaming | CQRS / event store |
| Using NoSQL for highly relational data | SaaS, fintech, CMS | PostgreSQL with joins |
| Over-engineering with microservices on day 1 | MVPs, Micro SaaS | Monolith-first |
| Hardcoded configuration | All | Environment variables |
| No rate limiting on public endpoints | APIs, auth services | Redis-based rate limiter |
| Ignoring DB migrations | All | Flyway, Alembic, Prisma migrate |
| Trusting JWTs without expiry | All auth | Short-lived tokens + refresh flow |
| Flat file logging | Production services | Structured JSON + log aggregator |
| No health check endpoint | Containerized apps | `/health` with DB ping |
| Catching all errors silently | All | Log + re-throw or return error response |

---

## Pre-Delivery Checklist (Mandatory)

Before presenting any backend code or API to the user, verify:

**Security**
- [ ] No secrets or credentials in code
- [ ] Passwords hashed with bcrypt or argon2id
- [ ] All inputs validated with a schema library
- [ ] SQL queries parameterized (no string interpolation)
- [ ] Auth middleware applied to all protected routes
- [ ] CORS configured restrictively

**API Quality**
- [ ] Consistent response envelope shape
- [ ] All list endpoints paginated
- [ ] HTTP status codes used correctly
- [ ] API versioned (`/v1/`)
- [ ] Error messages safe for client consumption

**Operational Readiness**
- [ ] Health check endpoint exists
- [ ] Structured logging with request IDs
- [ ] Graceful shutdown on SIGTERM
- [ ] Environment-based configuration
- [ ] Database connection pooling configured

**Code Quality**
- [ ] Business logic separated from controllers
- [ ] Async errors handled (no unhandled rejections)
- [ ] At minimum, happy-path integration test exists

---

## Quick Reference: Stack Selection Guide

| If the user mentions... | Default to... |
|---|---|
| "Node", "Express", "Fastify" | `references/node-express.md` |
| "NestJS" | `references/node-nestjs.md` |
| "Python", "FastAPI", "Flask" | `references/python-fastapi.md` |
| "Django", "DRF" | `references/python-django.md` |
| "Go", "Golang", "Gin", "Echo" | `references/go-gin.md` |
| "Rust", "Actix" | `references/rust-actix.md` |
| "Prisma", "Drizzle", "TypeORM" | `references/databases.md` |
| "Docker", "CI/CD", "deploy" | `references/devops.md` |
| "test", "jest", "pytest", "vitest" | `references/testing.md` |
| "auth", "JWT", "OAuth", "login" | `references/auth.md` |

If no stack is mentioned, **default to Node.js + Express + PostgreSQL + Prisma** — the most widely understood backend stack.

# Node.js + Express / Fastify Reference

## Project Structure (Express)

```
src/
├── app.ts              # Express app setup (no listen here)
├── server.ts           # Entry point (listen + graceful shutdown)
├── routes/             # Route definitions only — no logic
│   └── users.routes.ts
├── controllers/        # Request/response handling — thin
│   └── users.controller.ts
├── services/           # Business logic
│   └── users.service.ts
├── repositories/       # DB access layer
│   └── users.repository.ts
├── middlewares/        # Auth, validation, error handling
│   ├── auth.middleware.ts
│   ├── validate.middleware.ts
│   └── error.middleware.ts
├── models/             # DB models / Prisma schema lives at root
├── dtos/               # Input validation schemas (Zod)
├── utils/              # Shared helpers
└── config/             # Env config, constants
```

## Essential Dependencies

```json
{
  "dependencies": {
    "express": "^4.x",           // or fastify ^4.x
    "zod": "^3.x",               // input validation
    "prisma": "^5.x",            // ORM (or drizzle-orm)
    "@prisma/client": "^5.x",
    "jsonwebtoken": "^9.x",
    "bcryptjs": "^2.x",
    "ioredis": "^5.x",           // Redis client
    "pino": "^8.x",              // structured logging
    "helmet": "^7.x",            // security headers
    "cors": "^2.x",
    "express-rate-limit": "^7.x"
  },
  "devDependencies": {
    "typescript": "^5.x",
    "vitest": "^1.x",            // or jest
    "supertest": "^6.x",
    "@types/express": "^4.x"
  }
}
```

## Express App Setup Pattern

```typescript
// app.ts
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import pino from 'pino-http';
import { errorHandler } from './middlewares/error.middleware';
import { userRouter } from './routes/users.routes';

const app = express();

// Security & parsing
app.use(helmet());
app.use(cors({ origin: process.env.ALLOWED_ORIGINS?.split(',') }));
app.use(express.json({ limit: '10kb' }));
app.use(pino());

// Rate limiting
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use('/api/', limiter);

// Routes
app.use('/api/v1/users', userRouter);
app.get('/health', (_, res) => res.json({ status: 'ok', timestamp: new Date() }));

// Error handler (must be last)
app.use(errorHandler);

export { app };
```

## Graceful Shutdown

```typescript
// server.ts
import { app } from './app';
import { prisma } from './db';

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});

const shutdown = async () => {
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
```

## Validation Middleware with Zod

```typescript
// dtos/create-user.dto.ts
import { z } from 'zod';

export const CreateUserDto = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
  name: z.string().min(1).max(100),
});

// middlewares/validate.middleware.ts
import { ZodSchema } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validate = (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(422).json({
        error: { code: 'VALIDATION_ERROR', details: result.error.flatten() }
      });
    }
    req.body = result.data;
    next();
  };
```

## Error Handler

```typescript
// middlewares/error.middleware.ts
import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  constructor(public statusCode: number, public code: string, message: string) {
    super(message);
  }
}

export const errorHandler = (
  err: Error, req: Request, res: Response, _next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: { code: err.code, message: err.message }
    });
  }
  // Never expose internal errors
  console.error(err);
  res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } });
};
```

## Response Envelope

Always use:
```typescript
// Success
res.status(200).json({ data: result });
res.status(201).json({ data: created });
res.status(204).send();  // delete

// Paginated
res.json({ data: items, meta: { total, page, limit, hasMore } });

// Error
res.status(422).json({ error: { code: 'VALIDATION_ERROR', message: '...', details: {} } });
res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Authentication required' } });
res.status(403).json({ error: { code: 'FORBIDDEN', message: 'Insufficient permissions' } });
res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Resource not found' } });
```

## Fastify Alternative

Use Fastify when: high throughput (>10k RPS), JSON-heavy APIs, built-in schema validation.

```typescript
import Fastify from 'fastify';

const app = Fastify({ logger: { level: 'info' } });

await app.register(import('@fastify/helmet'));
await app.register(import('@fastify/cors'), { origin: process.env.ALLOWED_ORIGINS });
await app.register(import('@fastify/rate-limit'), { max: 100, timeWindow: '15 minutes' });

app.get('/health', async () => ({ status: 'ok' }));
```

## Common Gotchas

- Always use `async/await` with proper try/catch — Express doesn't catch async errors automatically (use express-async-errors or wrap handlers)
- Never call `next()` AND send a response — pick one
- Use `req.ip` carefully behind reverse proxies — set `trust proxy`
- Avoid `express.static` for large files in production — use nginx/CDN

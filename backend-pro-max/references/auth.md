# Authentication & Authorization Reference

## Auth Strategy Selection

| Use Case | Recommended Strategy |
|---|---|
| Web app (stateful) | HTTP-only cookie sessions + CSRF protection |
| SPA / Mobile | JWT (access + refresh token pair) |
| Server-to-server | API Keys (hashed in DB, never stored plaintext) |
| Third-party login | OAuth2 / OIDC (use a provider: Auth0, Clerk, Supabase) |
| Internal microservices | mTLS or shared secret header |
| Enterprise | SAML 2.0 or OAuth2 with corporate IdP |

**Default recommendation**: JWT access + refresh tokens for most modern APIs.

---

## JWT Pattern (Access + Refresh Tokens)

### Token Specs
- **Access token**: short-lived (15 min), stateless, verified by signature
- **Refresh token**: long-lived (7–30 days), stored in DB, can be revoked
- **Signing algorithm**: RS256 (asymmetric, preferred for microservices) or HS256 (symmetric, fine for monoliths)

### Token Payload (Access Token)
```json
{
  "sub": "user_id",
  "email": "user@example.com",
  "role": "admin",
  "iat": 1234567890,
  "exp": 1234568790
}
```
Keep payloads small. Never store sensitive data (passwords, PII beyond ID) in JWT.

### Refresh Token Flow
```
POST /auth/login
  → returns { accessToken, refreshToken }
  → store accessToken in memory (not localStorage)
  → store refreshToken in httpOnly cookie

POST /auth/refresh
  → sends refreshToken cookie
  → server validates refresh token in DB
  → returns new accessToken (+ optionally rotate refreshToken)

POST /auth/logout
  → invalidates refresh token in DB
  → clears cookie
```

### Node.js JWT Implementation
```typescript
import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

export const generateTokens = (userId: string, role: string) => {
  const accessToken = jwt.sign(
    { sub: userId, role },
    ACCESS_SECRET,
    { expiresIn: '15m' }
  );

  const refreshToken = randomBytes(64).toString('hex'); // Opaque token
  // Store hash of refreshToken in DB with userId + expiry

  return { accessToken, refreshToken };
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, ACCESS_SECRET) as { sub: string; role: string };
};
```

### Python JWT Implementation
```python
from datetime import datetime, timedelta, timezone
from jose import jwt, JWTError
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_access_token(subject: str, role: str) -> str:
    expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    return jwt.encode(
        {"sub": subject, "role": role, "exp": expire},
        settings.SECRET_KEY,
        algorithm="HS256"
    )

def verify_token(token: str) -> dict:
    try:
        return jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
```

---

## Password Hashing

**Always use bcrypt (cost ≥ 12) or argon2id. Never MD5, SHA1, SHA256, or SHA512 alone.**

### Node.js
```typescript
import bcrypt from 'bcryptjs';

export const hashPassword = (password: string) => bcrypt.hash(password, 12);
export const verifyPassword = (password: string, hash: string) => bcrypt.compare(password, hash);
```

### Python
```python
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)
```

---

## API Key Authentication

Use for: machine-to-machine, webhook senders, developer APIs.

```typescript
// Generate: random 32 bytes, prefix for identification
const generateApiKey = () => {
  const key = `sk_live_${randomBytes(32).toString('hex')}`;
  // Store: hash in DB, return raw key to user ONCE
  const hash = createHash('sha256').update(key).digest('hex');
  return { key, hash };
};

// Validate
const validateApiKey = async (rawKey: string) => {
  const hash = createHash('sha256').update(rawKey).digest('hex');
  const apiKey = await db.apiKey.findUnique({ where: { hash } });
  if (!apiKey || apiKey.revokedAt) throw new UnauthorizedException();
  return apiKey;
};
```

---

## Role-Based Access Control (RBAC)

```typescript
// Simple role check middleware
export const requireRole = (...roles: string[]) =>
  (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: { code: 'FORBIDDEN', message: 'Insufficient permissions' } });
    }
    next();
  };

// Usage
router.delete('/users/:id', authenticate, requireRole('admin'), deleteUser);
```

---

## Rate Limiting Auth Endpoints

```typescript
import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';

// Strict limit on login (prevent brute force)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 5,                      // 5 attempts
  standardHeaders: true,
  store: new RedisStore({ client: redisClient }),
  message: { error: { code: 'TOO_MANY_REQUESTS', message: 'Too many login attempts' } }
});

app.post('/api/v1/auth/login', authLimiter, loginHandler);
```

---

## OAuth2 / Social Login

**Recommendation**: Don't implement OAuth2 from scratch. Use:
- **Clerk** — easiest, best DX, drop-in components
- **Auth0** — enterprise-grade, highly configurable
- **Supabase Auth** — good if using Supabase for DB
- **Lucia Auth** — open source, self-hosted, TypeScript-first
- **Passport.js** — Node.js library if you need full control

---

## Security Checklist for Auth

- [ ] Passwords hashed with bcrypt (≥12 rounds) or argon2id
- [ ] Access tokens expire in ≤15 minutes
- [ ] Refresh tokens stored as hashes in DB (not plaintext)
- [ ] Refresh tokens revokable (logout invalidates them)
- [ ] Auth endpoints rate limited (5 req/15min)
- [ ] JWT secret(s) are ≥32 random bytes, from env vars
- [ ] Password reset tokens expire in ≤1 hour and are single-use
- [ ] Account lockout after N failed attempts (or exponential backoff)
- [ ] All auth events logged (login, logout, failure, password change)
- [ ] No sensitive data in JWT payload (no passwords, SSNs, credit cards)
- [ ] HTTPS enforced in production (never HTTP for auth endpoints)
- [ ] Cookie flags: `httpOnly`, `secure`, `sameSite=strict` (for session/refresh cookies)

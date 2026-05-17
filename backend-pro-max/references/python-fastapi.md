# Python + FastAPI Reference

## Project Structure

```
app/
├── main.py               # FastAPI app creation + router registration
├── core/
│   ├── config.py         # Settings (pydantic-settings)
│   ├── security.py       # JWT, password hashing
│   └── database.py       # SQLAlchemy session setup
├── api/
│   └── v1/
│       ├── router.py     # Aggregates all v1 routes
│       └── endpoints/
│           └── users.py  # Route handlers (thin)
├── services/             # Business logic
│   └── user_service.py
├── repositories/         # DB queries
│   └── user_repository.py
├── models/               # SQLAlchemy ORM models
│   └── user.py
├── schemas/              # Pydantic request/response schemas
│   └── user.py
└── middleware/
    └── logging.py
```

## Essential Dependencies (pyproject.toml / requirements.txt)

```
fastapi>=0.110
uvicorn[standard]>=0.27
sqlalchemy>=2.0
alembic>=1.13
psycopg2-binary>=2.9       # PostgreSQL driver
pydantic>=2.0
pydantic-settings>=2.0
python-jose[cryptography]  # JWT
passlib[bcrypt]            # Password hashing
redis>=5.0
structlog>=24.0            # Structured logging
slowapi                    # Rate limiting
```

## App Setup Pattern

```python
# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.core.config import settings
from app.api.v1.router import api_router
from app.core.database import engine

@asynccontextmanager
async def lifespan(app: FastAPI):
    # startup
    yield
    # shutdown — close DB pools, Redis, etc.

app = FastAPI(
    title=settings.PROJECT_NAME,
    version="1.0.0",
    docs_url="/docs" if settings.DEBUG else None,  # Hide docs in production
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api/v1")

@app.get("/health")
async def health():
    return {"status": "ok"}
```

## Config with Pydantic Settings

```python
# core/config.py
from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    PROJECT_NAME: str = "MyAPI"
    DATABASE_URL: str
    REDIS_URL: str = "redis://localhost:6379"
    SECRET_KEY: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    REFRESH_TOKEN_EXPIRE_DAYS: int = 30
    ALLOWED_ORIGINS: list[str] = ["http://localhost:3000"]
    DEBUG: bool = False

    class Config:
        env_file = ".env"

@lru_cache
def get_settings():
    return Settings()

settings = get_settings()
```

## Schema Patterns (Pydantic v2)

```python
# schemas/user.py
from pydantic import BaseModel, EmailStr, field_validator
from datetime import datetime

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    name: str

    @field_validator('password')
    @classmethod
    def password_strength(cls, v):
        if len(v) < 8:
            raise ValueError('Password must be at least 8 characters')
        return v

class UserResponse(BaseModel):
    id: int
    email: EmailStr
    name: str
    created_at: datetime

    model_config = {"from_attributes": True}  # Enables ORM mode

class PaginatedResponse(BaseModel):
    data: list
    meta: dict  # total, page, limit, has_more
```

## Route Handler Pattern (Thin Controllers)

```python
# api/v1/endpoints/users.py
from fastapi import APIRouter, Depends, HTTPException, status
from app.services.user_service import UserService
from app.schemas.user import UserCreate, UserResponse
from app.core.security import get_current_user

router = APIRouter(prefix="/users", tags=["users"])

@router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def create_user(
    payload: UserCreate,
    service: UserService = Depends()
):
    return await service.create_user(payload)

@router.get("/me", response_model=UserResponse)
async def get_me(current_user = Depends(get_current_user)):
    return current_user
```

## Error Handling

```python
# Always use HTTPException — never let exceptions leak to client
from fastapi import HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.requests import Request

class AppException(Exception):
    def __init__(self, status_code: int, code: str, message: str):
        self.status_code = status_code
        self.code = code
        self.message = message

# Register in main.py:
@app.exception_handler(AppException)
async def app_exception_handler(request: Request, exc: AppException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": {"code": exc.code, "message": exc.message}}
    )

@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception):
    # Log internally, never expose to client
    return JSONResponse(
        status_code=500,
        content={"error": {"code": "INTERNAL_ERROR", "message": "Internal server error"}}
    )
```

## Rate Limiting with SlowAPI

```python
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter

@router.post("/auth/login")
@limiter.limit("5/minute")
async def login(request: Request, ...):
    ...
```

## Alembic Migrations

```bash
# Initialize
alembic init alembic

# Create migration
alembic revision --autogenerate -m "add users table"

# Apply
alembic upgrade head

# Rollback
alembic downgrade -1
```

## Common Gotchas

- Always use `async def` for route handlers in FastAPI — sync handlers block the event loop
- Use `Depends()` for dependency injection, not global state
- Never return SQLAlchemy model objects directly — always serialize through Pydantic schemas
- Use `response_model_exclude_unset=True` to avoid sending null fields
- Set `docs_url=None` and `redoc_url=None` in production to hide API docs
- Use `asyncpg` instead of `psycopg2` for async DB access with SQLAlchemy 2.0

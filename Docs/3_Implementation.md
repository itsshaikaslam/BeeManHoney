# Backend Implementation Guide

## Phase 1: Docker Infrastructure

### 1.1. Docker Compose
Create `docker-compose.yml` in the root directory.

```yaml
version: '3.8'
services:
  db:
    image: ankane/pgvector:v0.5.1 # Pre-installed pgvector
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: secretpassword
      POSTGRES_DB: beemanhoney
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U admin"]
      interval: 5s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  api:
    build: 
      context: ./backend
      dockerfile: Dockerfile
    command: uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
    volumes:
      - ./backend:/app
    environment:
      DATABASE_URL: postgresql+asyncpg://admin:secretpassword@db:5432/beemanhoney
      REDIS_URL: redis://redis:6379/0
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_started
    ports:
      - "8000:8000"

  worker:
    build: 
      context: ./backend
      dockerfile: Dockerfile
    command: celery -A app.worker.celery_app worker --loglevel=info
    environment:
      DATABASE_URL: postgresql+asyncpg://admin:secretpassword@db:5432/beemanhoney
      REDIS_URL: redis://redis:6379/0
      OPENAI_API_KEY: ${OPENAI_API_KEY}
    depends_on:
      redis:
        condition: service_started

volumes:
  postgres_data:
```

## Phase 2: Python Backend Setup

### 2.1. Dependency Management
Inside `backend/`, create `requirements.txt`:
```text
fastapi==0.109.0
uvicorn[standard]==0.27.0
sqlalchemy==2.0.25
asyncpg==0.29.0
alembic==1.13.1
pydantic==2.6.0
pydantic-settings==2.1.0
langchain==0.1.5
langgraph==0.0.22
langchain-openai==0.0.5
celery==5.3.6
redis==5.0.1
python-multipart==0.0.6
psycopg2-binary==2.9.9 # For sync Alembic operations
httpx==0.26.0
passlib[bcrypt]==1.7.4
python-jose[cryptography]==3.3.0
```

### 2.2. Database Configuration
Create `backend/app/db/session.py`:
```python
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

engine = create_async_engine(settings.DATABASE_URL, echo=True)
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session
```

## Phase 3: Migration Setup

1.  **Initialize Alembic**:
    ```bash
    cd backend
    alembic init alembic
    ```
2.  **Edit `alembic/env.py`**:
    Import your `Base` model and set `target_metadata = Base.metadata`.
    Configure the `run_migrations_online` function to use the Async engine.
3.  **Run Migration**:
    ```bash
    alembic revision --autogenerate -m "Initial schema"
    alembic upgrade head
    ```

## Phase 4: LangGraph Agent Implementation
Create `backend/app/agents/graph.py`:

```python
from typing import TypedDict, Annotated, Sequence
from langchain_core.messages import BaseMessage
import operator
from langgraph.graph import StateGraph, END

class AgentState(TypedDict):
    messages: Annotated[Sequence[BaseMessage], operator.add]

def supervisor_node(state):
    # Logic to decide next agent
    pass

workflow = StateGraph(AgentState)
workflow.add_node("supervisor", supervisor_node)
workflow.add_node("sales", sales_agent_node)
workflow.set_entry_point("supervisor")
# ... edges ...
app = workflow.compile()
```

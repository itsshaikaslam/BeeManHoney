# Backend Requirements (Python)

## 1. Runtime
-   **Python**: `3.11.x` (Official Docker Image `python:3.11-slim`).

## 2. Core Libraries
| Library | Version | Purpose |
| :--- | :--- | :--- |
| `fastapi` | `0.109.0` | Web Framework. |
| `uvicorn` | `0.27.0` | ASGI Server. |
| `pydantic` | `2.6.0` | Data Validation (v2). |
| `sqlalchemy` | `2.0.25` | ORM. |
| `alembic` | `1.13.1` | Migrations. |

## 3. AI & Async
| Library | Version | Purpose |
| :--- | :--- | :--- |
| `langchain` | `0.1.5` | LLM Framework. |
| `langgraph` | `0.0.22` | Agent Orchestration. |
| `celery` | `5.3.6` | Task Queue. |
| `redis` | `5.0.1` | Redis Client. |
| `asyncpg` | `0.29.0` | Async Postgres Driver. |

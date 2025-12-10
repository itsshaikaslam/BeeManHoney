# Configuration JSON Schema

This file describes the `config.json` or Environment Variable mapping expected by the backend.

```json
{
  "server": {
    "host": "0.0.0.0",
    "port": 8000,
    "log_level": "info",
    "cors_origins": ["http://localhost:5173", "https://beemanhoney.com"]
  },
  "security": {
    "jwt_secret": "CHANGE_THIS_IN_PROD",
    "jwt_algorithm": "HS256",
    "access_token_expire_minutes": 60
  },
  "database": {
    "url": "postgresql+asyncpg://user:pass@db:5432/beemanhoney",
    "pool_size": 20,
    "max_overflow": 10
  },
  "redis": {
    "url": "redis://redis:6379/0",
    "task_queue_name": "celery"
  },
  "ai": {
    "openai_api_key": "sk-...",
    "model_fast": "gpt-3.5-turbo-0125",
    "model_smart": "gpt-4-turbo-preview",
    "embedding_model": "text-embedding-3-small",
    "langsmith_api_key": "ls-...",
    "langsmith_tracing": true
  },
  "feature_flags": {
    "enable_deep_agents": true,
    "maintenance_mode": false
  }
}
```

# Project Directory Structure

## 1. Monorepo Layout

```text
/
├── Frontend/                   # React Application
│   ├── src/
│   │   ├── components/         # Reusable UI (Header, Footer)
│   │   ├── pages/              # Route Components
│   │   ├── hooks/              # Custom React Hooks (useAuth, useChat)
│   │   ├── services/           # API Clients (axios instances)
│   │   └── types/              # TS Interfaces
│   ├── vite.config.ts
│   └── package.json
│
├── backend/                    # FastAPI Application
│   ├── app/
│   │   ├── api/
│   │   │   └── v1/             # Versioned Endpoints
│   │   │       ├── auth.py
│   │   │       ├── products.py
│   │   │       └── chat.py
│   │   ├── core/               # Configuration
│   │   │   ├── config.py       # Pydantic Settings
│   │   │   └── security.py     # JWT Logic
│   │   ├── db/                 # Database
│   │   │   ├── base.py         # SQLAlchemy Base
│   │   │   └── session.py
│   │   ├── models/             # SQLAlchemy Models
│   │   │   ├── user.py
│   │   │   └── product.py
│   │   ├── schemas/            # Pydantic Schemas (Request/Response)
│   │   │   ├── chat.py
│   │   │   └── token.py
│   │   └── agents/             # AI Logic
│   │       ├── tools/          # LangChain Tools
│   │       └── workflow.py     # LangGraph Definition
│   ├── tests/                  # Pytest
│   ├── alembic/                # DB Migrations
│   ├── Dockerfile
│   └── requirements.txt
│
├── Docs/                       # Documentation
└── docker-compose.yml
```

## 2. Naming Conventions

### 2.1. Frontend
-   **Components**: PascalCase (e.g., `ProductCard.tsx`).
-   **Hooks**: camelCase with 'use' prefix (e.g., `useCart.ts`).
-   **CSS Classes**: kebab-case (Tailwind standard).

### 2.2. Backend
-   **Modules/Files**: snake_case (e.g., `product_service.py`).
-   **Classes**: PascalCase (e.g., `ProductService`).
-   **Variables/Functions**: snake_case (e.g., `get_product_by_id`).
-   **Constants**: UPPER_CASE (e.g., `MAX_RETRY_COUNT`).

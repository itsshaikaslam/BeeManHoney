# Vendor & Platform Configuration

## 1. OpenAI (LLM Provider)
-   **API Key**: Injected via `OPENAI_API_KEY`.
-   **Models**: `gpt-4-turbo` (Supervisor), `gpt-3.5-turbo` (Sales).
-   **Retry Strategy**: Exponential backoff (1s, 2s, 4s) up to 3 retries.

## 2. LangSmith (Observability)
-   **Project Name**: `beemanhoney-prod`.
-   **Sampling**: Trace 100% of errors, 1% of successes in Prod.

## 3. Redis (Cache/Broker)
-   **Persistence**: RDB snapshots every 15 minutes.
-   **Eviction Policy**: `allkeys-lru` (Least Recently Used) for Chat History.

## 4. PostgreSQL (Database)
-   **Connection Pool**: size=20, overflow=10.
-   **Vector Extension**: `pgvector` must be enabled (`CREATE EXTENSION vector;`).

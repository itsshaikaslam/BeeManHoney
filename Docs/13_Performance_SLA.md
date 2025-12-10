# Performance Service Level Agreements (SLA)

## 1. Latency Targets

| Metric | Target (P95) | Target (P99) | Description |
| :--- | :--- | :--- | :--- |
| **API Response (Read)** | 100ms | 300ms | Simple GET requests (Products, Home). |
| **API Response (Write)** | 200ms | 500ms | Creating orders, updating profile. |
| **Vector Search** | 300ms | 800ms | Embedding generation + DB Query. |
| **AI Stream Start** | 1.5s | 3.0s | Time until first text token appears in Chat. |

## 2. Throughput & Scalability
-   **Concurrent Users**: 500 active sessions.
-   **Chat Sessions**: 50 concurrent active agents per Worker node.
-   **DB Connections**: Max 100 active connections (Managed by PgBouncer if needed).

## 3. Availability
-   **Uptime**: 99.9% during business hours (9 AM - 9 PM IST).
-   **Maintenance Window**: 2 AM - 4 AM IST (Sundays).

## 4. Monitoring
-   **Health Check Endpoint**: `GET /health` must return `200 OK` within 50ms.
-   **Alerts**: Slack notification if Error Rate > 2% for 5 minutes.

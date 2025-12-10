# Error Handbook

## 1. Backend Error Codes (FastAPI)

| HTTP Code | Internal Code | Description | Solution |
| :--- | :--- | :--- | :--- |
| **400** | `ERR_BAD_REQUEST` | Malformed JSON or invalid Pydantic schema. | Check payload against `Docs/14_API_Contract.md`. |
| **401** | `ERR_AUTH_INVALID` | Invalid JWT or expired token. | Frontend should trigger a silent refresh or redirect to login. |
| **403** | `ERR_FORBIDDEN` | User lacks role for action (e.g., uploading products). | Check `users.role` in DB. |
| **404** | `ERR_NOT_FOUND` | Resource (Product/Order) does not exist. | Validate ID. |
| **422** | `ERR_VALIDATION` | Specific field validation failure. | Review response body `detail` for field name. |
| **500** | `ERR_INTERNAL` | Unhandled Exception. | Check application logs in Docker (`docker logs api`). |
| **503** | `ERR_DB_UNAVAILABLE` | Database connection failed. | Check Postgres container health. |

## 2. AI Specific Errors

### `LLM_CONTEXT_EXCEEDED`
-   **Cause**: Conversation history is too long (> 128k tokens).
-   **Solution**: The backend `Memory` module automatically summarizes old messages. If this persists, manually clear chat history in Redis.

### `VECTOR_DIMENSION_MISMATCH`
-   **Cause**: Searching 1536-dim vectors in a 768-dim column.
-   **Solution**: Ensure `text-embedding-3-small` is used consistently for both Indexing and Searching.

## 3. Debugging Procedures
1.  **API Logs**: `docker logs -f beemanhoney-api-1`
2.  **Worker Logs**: `docker logs -f beemanhoney-worker-1`
3.  **DB Shell**: `docker exec -it beemanhoney-db-1 psql -U admin beemanhoney`

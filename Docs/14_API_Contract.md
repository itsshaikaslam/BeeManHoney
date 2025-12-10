# API Contract

## 1. Base URL
`https://api.beemanhoney.com/api/v1`

## 2. Endpoints

### 2.1. Authentication
**POST** `/auth/token`
-   **Summary**: Login with OAuth2 Password Flow.
-   **Content-Type**: `application/x-www-form-urlencoded`
-   **Body**: `username=user@example.com&password=secret`
-   **Response 200**:
    ```json
    {
      "access_token": "eyJ...",
      "token_type": "bearer"
    }
    ```

### 2.2. Products
**GET** `/products/`
-   **Query Params**:
    -   `q` (string): Semantic search query.
    -   `category` (string, optional).
-   **Response 200**:
    ```json
    [
      {
        "id": 1,
        "name": "Clover Honey",
        "price": 450.0,
        "description": "Sweet...",
        "image_url": "http..."
      }
    ]
    ```

### 2.3. AI Chat
**POST** `/chat/stream`
-   **Headers**: `Authorization: Bearer <token>`
-   **Body**:
    ```json
    {
      "message": "Which honey is best for tea?",
      "thread_id": "uuid-v4"
    }
    ```
-   **Response**: `text/event-stream`
    -   Events: `message` (token chunk), `error`, `end`.

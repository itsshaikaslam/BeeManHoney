# Low Level Design (LLD)

## 1. Entity Relationship Diagram (ERD)

```mermaid
erDiagram
    USER ||--o{ ORDER : places
    USER {
        uuid id PK
        string email UK
        string password_hash
        string role
    }
    PRODUCT ||--o{ ORDER_ITEM : contains
    PRODUCT {
        int id PK
        string name
        decimal price
        vector embedding
        int stock_quantity
    }
    ORDER ||--|{ ORDER_ITEM : has
    ORDER {
        uuid id PK
        uuid user_id FK
        decimal total_amount
        string status
        timestamp created_at
    }
    ORDER_ITEM {
        uuid id PK
        uuid order_id FK
        int product_id FK
        int quantity
        decimal unit_price
    }
```

## 2. Database Schema Details

### Table: `products`
-   **id**: `SERIAL PRIMARY KEY`
-   **embedding**: `vector(1536)` (Requires `CREATE EXTENSION vector;`)
-   **Index**: `CREATE INDEX ON products USING hnsw (embedding vector_cosine_ops);` (For fast similarity search).

### Table: `users`
-   **id**: `UUID DEFAULT gen_random_uuid()`
-   **role**: `VARCHAR(20) DEFAULT 'customer'` (Values: 'customer', 'admin', 'guest_scanner').

## 3. Class Structure (Python)

### 3.1. LangGraph State
```python
class AgentState(TypedDict):
    input: str
    chat_history: list[BaseMessage]
    agent_outcome: Union[AgentAction, AgentFinish, None]
    intermediate_steps: list[tuple[AgentAction, str]]
```

### 3.2. Product Service
```python
class ProductService:
    def __init__(self, db: AsyncSession):
        self.db = db
        
    async def get_similar_products(self, query_vector: list[float], k: int = 5):
        # SQLAlchemy select statement with ordering by cosine distance
        pass
```

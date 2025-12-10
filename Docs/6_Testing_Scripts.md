# Testing Scripts & Strategy

## 1. Testing Pyramid

-   **Unit Tests (70%)**: Test individual functions/agents (Mock LLM, Mock DB).
-   **Integration Tests (20%)**: Test API endpoints with real DB (in Docker).
-   **E2E Tests (10%)**: Frontend + Backend flows.

## 2. Backend Test Scripts (Pytest)

### 2.1. Conftest Setup (`tests/conftest.py`)
```python
import pytest
from httpx import AsyncClient
from app.main import app

@pytest.fixture
async def async_client():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        yield ac

@pytest.fixture
def mock_llm(mocker):
    return mocker.patch("langchain_openai.ChatOpenAI.invoke")
```

### 2.2. Agent Logic Test (`tests/test_agent.py`)
**Goal**: Verify the supervisor routes correctly without calling OpenAI.

```python
@pytest.mark.asyncio
async def test_supervisor_routing(mock_llm):
    # Setup mock to return a function call to 'sales_agent'
    mock_llm.return_value.tool_calls = [{"name": "sales_agent", "args": {}}]
    
    from app.agents.graph import supervisor_node
    state = {"messages": [{"role": "user", "content": "I want to buy honey"}]}
    result = await supervisor_node(state)
    
    assert result["next"] == "sales_agent"
```

### 2.3. Endpoint Integration (`tests/test_api_products.py`)

```python
@pytest.mark.asyncio
async def test_create_and_get_product(async_client):
    # 1. Create Product (Admin)
    resp = await async_client.post("/api/v1/products/", json={
        "name": "Test Honey", "price": 100.0, "category": "Test"
    }, headers={"Authorization": "Bearer admin_token"})
    assert resp.status_code == 201
    
    # 2. Get Product (Public)
    prod_id = resp.json()["id"]
    get_resp = await async_client.get(f"/api/v1/products/{prod_id}")
    assert get_resp.status_code == 200
    assert get_resp.json()["name"] == "Test Honey"
```

## 3. Frontend Testing (Vitest/Jest)
Run `npm run test` in Frontend folder.
-   **Component Test**: Render `ProductCard` and check if price formats correctly.
-   **Hook Test**: Test `useCart` adds items to state correctly.

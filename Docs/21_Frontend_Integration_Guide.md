# Frontend Integration Guide (Mock to Real)

This document serves as the bridge between the current "UI Prototype" (Frontend) and the "Production Backend". Follow these steps once the Backend API is live.

## 1. Environment Configuration

### 1.1. Create `.env` file
Create a `.env` file in the `Frontend/` root to define the API endpoint.

```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

### 1.2. Create API Client
Create `Frontend/src/services/api.ts` to handle global configuration.

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add Interceptor for JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

## 2. Component Migration Strategy

### 2.1. Products Page (`src/pages/Products.tsx`)
**Current State**: Uses hardcoded `products` array.
**Migration Action**:
1. Import `api` from `../services/api`.
2. Use `useEffect` to fetch data.

```typescript
// Replace hardcoded array with:
const [products, setProducts] = useState<Product[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const { data } = await api.get('/products');
      setProducts(data);
    } catch (error) {
      console.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };
  fetchProducts();
}, []);
```

### 2.2. Login Page (`src/pages/Login.tsx`)
**Current State**: `onSubmit` prevents default but does nothing.
**Migration Action**:

```typescript
const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const { data } = await api.post('/auth/token', { username: email, password });
    localStorage.setItem('token', data.access_token);
    navigate('/home');
  } catch (err) {
    alert('Invalid credentials');
  }
};
```

### 2.3. History Page (`src/pages/History.tsx`)
**Current State**: Mock `orders` array.
**Migration Action**: Fetch `/orders/user/me`.

## 3. Integrating the AI Chat Widget
**Action**: Create a new component `Frontend/src/components/ChatWidget.tsx`.

### 3.1. Streaming Implementation (SSE)
The backend uses Server-Sent Events. Do not use Axios for this. Use `EventSource` or `fetch` with a stream reader.

```typescript
const sendMessage = async (message: string) => {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/chat/stream`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({ message })
  });

  const reader = response.body?.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader!.read();
    if (done) break;
    const chunk = decoder.decode(value);
    // Append chunk to chat state
    setChatHistory(prev => prev + chunk);
  }
};
```

## 4. Verification Checklist
- [ ] Ensure CORS is enabled on FastAPI (`Docs/10_Config_Json.md`).
- [ ] Ensure `VITE_API_BASE_URL` matches the Docker container URL.
- [ ] Test the JWT flow: Login -> Store Token -> Access Protected Route (`/history`).

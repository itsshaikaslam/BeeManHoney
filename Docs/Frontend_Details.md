# BeeManHoney Frontend Architecture & Functionality Guide

This document serves as the comprehensive specification for the BeeManHoney React frontend. It details the behavior of every page, user interactions, and specific requirements for the backend API to support the UI.

## 1. Architecture Overview

-   **Framework**: React 18 (Vite)
-   **Styling**: Tailwind CSS with custom theme configuration (Honey Gold/Deep Amber palette).
-   **Routing**: `react-router-dom` (HashRouter for static hosting compatibility).
-   **State Management**: Local component state (useState).
-   **Icons**: Lucide React.
-   **Responsiveness**: Mobile-first approach with breakpoints matching standard Tailwind presets.

---

## 2. Route Map

| Route | Component | Purpose | Access |
| :--- | :--- | :--- | :--- |
| `/` | `Navigate` | Redirects to `/login` (Preview mode) or `/home` (Production) | Public |
| `/home` | `Home` | Landing page with featured items | Public |
| `/login` | `Login` | User authentication & QR scan | Public |
| `/signup` | `Signup` | User registration | Public |
| `/products` | `Products` | Product catalog with filtering | Public |
| `/about` | `About` | Brand story and info | Public |
| `/sourcing` | `Sourcing` | Apiary locations and sustainability info | Public |
| `/contact` | `Contact` | Contact form and details | Public |
| `/recipes` | `Recipes` | Recipe blog/list | Public |
| `/history` | `History` | User order history (acts as Account/Cart hybrid) | Private (Requires Auth) |

---

## 3. Page Breakdown & Backend API Requirements

### 3.1. Authentication: Login (`/login`)
**Functionality**:
-   **Standard Login**: Email/Password form.
-   **Social Auth**: Google/GitHub buttons (Visual only, requires OAuth integration).
-   **QR Scan Mode**: Toggles a mock camera UI. Designed to scan physical QR codes on product jars or membership cards.
-   **Links**: Navigation to Signup and Forgot Password.

**Backend Requirements**:
-   **Endpoint**: `POST /api/auth/login`
    -   *Payload*: `{ "email": "user@example.com", "password": "..." }`
    -   *Response*: `{ "token": "jwt_string", "user": { "id": "...", "name": "..." } }`
-   **Endpoint**: `POST /api/auth/qr-login`
    -   *Purpose*: Authenticate via scanned token.
    -   *Payload*: `{ "qr_token": "scanned_string" }`

### 3.2. Authentication: Signup (`/signup`)
**Functionality**:
-   **Registration**: Fields for Full Name, Email, Password.
-   **Validation**: Frontend checks for required fields (currently basic HTML5 validation).

**Backend Requirements**:
-   **Endpoint**: `POST /api/auth/register`
    -   *Payload*: `{ "name": "John Doe", "email": "...", "password": "..." }`
    -   *Response*: `{ "token": "jwt_string", "user": { ... } }`

### 3.3. Home Page (`/home`)
**Functionality**:
-   **Hero Section**: Static promotional banner.
-   **Featured Products**: Displays a grid of 3 highlighted items.
-   **Categories**: Quick links to filter the product catalog.
-   **Testimonials**: Static customer reviews.

**Backend Requirements**:
-   **Endpoint**: `GET /api/products/featured`
    -   *Purpose*: Fetch top 3-4 products for the homepage.
    -   *Response*: Array of `Product` objects (see Data Models).
-   **Endpoint**: `GET /api/testimonials` (Optional)
    -   *Purpose*: dynamic loading of reviews.

### 3.4. Product Catalog (`/products`)
**Functionality**:
-   **List View**: Grid display of product cards (Image, Name, Price, Description).
-   **Client-Side Filtering**: Tabs for "All", "Clover", "Wildflower", "Creamed", "Infused".
-   **Cart Interaction**: "Add to Cart" button on cards.
-   **Search**: Header search bar (Visual).

**Backend Requirements**:
-   **Endpoint**: `GET /api/products`
    -   *Query Params*: `?category=clover&search=term&sort=price_asc`
    -   *Response*: Array of `Product` objects.
-   **Endpoint**: `POST /api/cart/add`
    -   *Payload*: `{ "product_id": 123, "quantity": 1 }`

### 3.5. Order History (`/history`)
**Functionality**:
-   **List View**: Displays past orders with Date, Total Price (INR), and Status (Delivered/Shipped).
-   **Visuals**: Uses honey-comb pattern overlay on order cards.
-   **Cart Badge**: The header links here for "Cart" functionality in the current mock.

**Backend Requirements**:
-   **Endpoint**: `GET /api/orders/user/{user_id}`
    -   *Response*:
    ```json
    [
      {
        "id": "52301",
        "date": "2023-10-24",
        "total": 1800.00,
        "currency": "INR",
        "status": "Delivered",
        "items": [...]
      }
    ]
    ```

### 3.6. Recipes (`/recipes`)
**Functionality**:
-   **Content**: List of recipes with images and descriptions.
-   **Filtering**: Horizontal scrollable chips for categories (Desserts, Drinks, etc.).
-   **Search**: Dedicated search bar for recipes.

**Backend Requirements**:
-   **Endpoint**: `GET /api/recipes`
    -   *Query Params*: `?category=dessert&q=searchterm`
    -   *ResponseSchema*: `[ { "id": 1, "title": "...", "image_url": "...", "category": "..." } ]`

### 3.7. Contact (`/contact`)
**Functionality**:
-   **Form**: Name, Email, Message inputs.
-   **Info**: Static address (Coorg, India), Phone, Email.

**Backend Requirements**:
-   **Endpoint**: `POST /api/contact`
    -   *Payload*: `{ "name": "...", "email": "...", "message": "..." }`
    -   *Purpose*: Trigger email notification to support team.

### 3.8. Sourcing (`/sourcing`)
**Functionality**:
-   **Map Visual**: Static map image with hoverable "pins" showing apiary locations (Himachal, Kerala).
-   **Info**: Sustainability text.

**Backend Requirements**:
-   **Endpoint**: `GET /api/apiaries` (Optional)
    -   *Purpose*: If map pins become dynamic.
    -   *Response*: `[ { "lat": ..., "lng": ..., "location_name": "...", "description": "..." } ]`

---

## 4. Global Components & UI Patterns

### 4.1. Header
-   **Desktop**: Sticky top. Contains Logo, Nav Links, Search Icon, User Icon (links to Login), Cart Icon (with notification badge).
-   **Mobile**: Hamburger menu toggles dropdown links.
-   **Currency**: All prices displayed in header/cart components must use `Intl.NumberFormat('en-IN')` for `₹` symbol and Indian numbering system (e.g., 1,20,000).

### 4.2. Mobile Navigation
-   **Position**: Fixed bottom.
-   **Items**: Home, Shop (`/products`), Recipes, Cart (`/history`), Profile (`/login`).
-   **Active State**: Highlighted icon + text color change (`text-primary`).

### 4.3. Currency Utility
-   Located in `utils/currency.ts`.
-   **Function**: `formatPrice(amount: number)`
-   **Implementation**: Enforces `en-IN` locale. Backend should send raw numbers (float/integer), frontend handles formatting.

---

## 5. Data Models (JSON Schemas)

### Product Object
```json
{
  "id": "number | string",
  "name": "string",
  "price": "number", // in INR
  "description": "string",
  "image": "url_string",
  "category": "string",
  "stock_status": "in_stock | out_of_stock"
}
```

### Order Object
```json
{
  "id": "string",
  "date": "ISO8601 string",
  "total": "number",
  "status": "Delivered | Shipped | Processing | Cancelled"
}
```

## 6. Setup & Deployment Notes

1.  **Environment Variables**:
    -   `VITE_API_BASE_URL`: Base URL for the backend API.
2.  **Build Process**:
    -   Run `npm run build` to generate the `dist` folder.
    -   Serve `dist` as a static site (S3, Vercel, Netlify).
    -   Ensure `index.html` is the entry point for all routes (SPA configuration).

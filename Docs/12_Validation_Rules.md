# Validation Rules

## 1. User Account

### Email
-   **Format**: Regex `^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$`
-   **Uniqueness**: Checked against DB.

### Password
-   **Min Length**: 8 characters.
-   **Complexity**: At least one digit, one uppercase, one special character (`@$!%*?&`).

## 2. Product Data

### Price
-   **Range**: `0.00` to `100000.00` INR.
-   **Precision**: 2 decimal places.

### Vector Embedding
-   **Dimensions**: Must be exactly 1536 floats.
-   **Type**: `List[float]`.

## 3. API Request Parameters

### Pagination
-   `skip`: Min 0.
-   `limit`: Min 1, Max 100 (Default 20).

### Search Query
-   **Length**: Max 200 characters (to prevent DoS on Embedding API).
-   **Sanitization**: No SQL injection characters (handled by SQLAlchemy, but good to trim).

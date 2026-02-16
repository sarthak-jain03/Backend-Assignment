# Backend Assignment — API Documentation

**Base URL:** `http://localhost:8080`

---

## Authentication

### POST `/auth/signup`

Create a new user account.

**Access:** Public

**Request Body:**
```json
{
  "username": "john",
  "password": "pass123",
  "role": "USER"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `username` | String | ✅ | Unique username |
| `password` | String | ✅ | User password |
| `role` | String | ❌ | `USER` or `ADMIN` (defaults to `USER`) |

**Response:** `200 OK`
```json
{
  "id": 1,
  "username": "john"
}
```

**Errors:**
| Status | Reason |
|--------|--------|
| `400` | User already exists |

---

### POST `/auth/login`

Authenticate and receive a JWT token.

**Access:** Public

**Request Body:**
```json
{
  "username": "john",
  "password": "pass123"
}
```

**Response:** `200 OK`
```json
{
  "jwt": "eyJhbGciOiJIUzI1NiJ9...",
  "username": "john",
  "id": 1
}
```

**Errors:**
| Status | Reason |
|--------|--------|
| `401` | Invalid credentials |

> **Note:** Include the JWT in all subsequent requests as:
> `Authorization: Bearer <jwt_token>`

---

## Categories

All category endpoints require authentication (valid JWT). Create, Update, and Delete require **ADMIN** role.

### GET `/api/categories`

Fetch all categories with their products.

**Access:** Authenticated (any role)

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "name": "Electronics",
    "products": [
      {
        "id": 1,
        "name": "Laptop",
        "description": "Gaming laptop",
        "price": 999.99,
        "categoryId": 1
      }
    ]
  }
]
```

---

### GET `/api/categories/{id}`

Fetch a single category by ID.

**Access:** Authenticated (any role)

**Headers:** `Authorization: Bearer <token>`

**Path Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `id` | Long | Category ID |

**Response:** `200 OK`
```json
{
  "id": 1,
  "name": "Electronics",
  "products": [...]
}
```

**Errors:**
| Status | Reason |
|--------|--------|
| `404` | Category not found |

---

### POST `/api/categories`

Create a new category.

**Access:** `ADMIN` only

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "Electronics"
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "name": "Electronics",
  "products": []
}
```

**Errors:**
| Status | Reason |
|--------|--------|
| `403` | Access denied (non-ADMIN) |

---

### PUT `/api/categories/{id}`

Update a category (full replacement).

**Access:** `ADMIN` only

**Headers:** `Authorization: Bearer <token>`

**Path Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `id` | Long | Category ID |

**Request Body:**
```json
{
  "name": "Updated Name"
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "name": "Updated Name",
  "products": [...]
}
```

---

### PATCH `/api/categories/{id}`

Partially update a category.

**Access:** `ADMIN` only

**Headers:** `Authorization: Bearer <token>`

**Path Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `id` | Long | Category ID |

**Request Body:**
```json
{
  "name": "Patched Name"
}
```

**Response:** `200 OK`

---

### DELETE `/api/categories/{id}`

Delete a category.

**Access:** `ADMIN` only

**Headers:** `Authorization: Bearer <token>`

**Path Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `id` | Long | Category ID |

**Response:** `200 OK` — returns the deleted category object

---

## Products

GET endpoints are public. Create, Update, and Delete require **ADMIN** role.

### GET `/api/products`

Fetch all products.

**Access:** Public (no authentication required)

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "name": "Laptop",
    "description": "Gaming laptop",
    "price": 999.99,
    "categoryId": 1
  }
]
```

---

### GET `/api/products/{id}`

Fetch a single product by ID.

**Access:** Public

**Path Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `id` | Long | Product ID |

**Response:** `200 OK`
```json
{
  "id": 1,
  "name": "Laptop",
  "description": "Gaming laptop",
  "price": 999.99,
  "categoryId": 1
}
```

**Errors:**
| Status | Reason |
|--------|--------|
| `404` | Product not found |

---

### POST `/api/products`

Create a new product.

**Access:** `ADMIN` only

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "Laptop",
  "description": "Gaming laptop",
  "price": 999.99,
  "categoryId": 1
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | String | ✅ | Product name |
| `description` | String | ❌ | Product description |
| `price` | Double | ✅ | Product price |
| `categoryId` | Long | ✅ | ID of parent category |

**Response:** `200 OK`
```json
{
  "id": 1,
  "name": "Laptop",
  "description": "Gaming laptop",
  "price": 999.99,
  "categoryId": 1
}
```

**Errors:**
| Status | Reason |
|--------|--------|
| `403` | Access denied (non-ADMIN) |
| `404` | Category not found |

---

### PUT `/api/products/{id}`

Update a product (full replacement).

**Access:** `ADMIN` only

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "Updated Laptop",
  "description": "Updated description",
  "price": 1299.99,
  "categoryId": 1
}
```

**Response:** `200 OK`

---

### PATCH `/api/products/{id}`

Partially update a product.

**Access:** `ADMIN` only

**Headers:** `Authorization: Bearer <token>`

**Request Body (any subset):**
```json
{
  "price": 799.99
}
```

> **Note:** `categoryId` is required even for partial updates (known backend limitation).

**Response:** `200 OK`

---

### DELETE `/api/products/{id}`

Delete a product.

**Access:** `ADMIN` only

**Headers:** `Authorization: Bearer <token>`

**Path Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `id` | Long | Product ID |

**Response:** `200 OK` — returns the deleted product object

---

## Error Response Format

All errors follow this structure:

```json
{
  "status": 403,
  "error": "Access Denied",
  "timestamp": "2026-02-16T18:45:00"
}
```

---

## Roles & Permissions Summary

| Endpoint | USER | ADMIN |
|----------|------|-------|
| `POST /auth/signup` | ✅ | ✅ |
| `POST /auth/login` | ✅ | ✅ |
| `GET /api/categories` | ✅ | ✅ |
| `POST /api/categories` | ❌ | ✅ |
| `PUT /api/categories/{id}` | ❌ | ✅ |
| `DELETE /api/categories/{id}` | ❌ | ✅ |
| `GET /api/products` | ✅ (public) | ✅ |
| `POST /api/products` | ❌ | ✅ |
| `PUT /api/products/{id}` | ❌ | ✅ |
| `DELETE /api/products/{id}` | ❌ | ✅ |

---

## Swagger UI

Interactive API docs available at:

```
http://localhost:8080/swagger-ui/index.html
```

> Requires `springdoc-openapi-starter-webmvc-ui` v3.0.0 (Spring Boot 4.x compatible).

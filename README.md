# Backend Assignment — Full-Stack Product Management System

A full-stack application built with **Spring Boot 4** (backend) and **React + Vite** (frontend) for managing categories and products with role-based access control and JWT authentication.

---

## 🚀 Tech Stack

### Backend
| Technology | Version |
|------------|---------|
| Java | 21 |
| Spring Boot | 4.0.2 |
| Spring Security | JWT-based stateless auth |
| Spring Data JPA | Hibernate + MySQL |
| Springdoc OpenAPI | 3.0.0 (Swagger UI) |
| Lombok | Latest |
| Maven | Build tool |

### Frontend
| Technology | Purpose |
|------------|---------|
| React 19 | UI framework |
| Vite | Dev server & bundler |
| React Router DOM | Client-side routing |
| Axios | HTTP client |

---

## 📁 Project Structure

```
Backend-Assignment/
├── src/main/java/.../
│   ├── controller/          # REST controllers (Auth, Category, Product)
│   ├── dto/                 # Data Transfer Objects
│   ├── entity/              # JPA entities (User, Category, Product, Role)
│   ├── error/               # Global exception handling
│   ├── mapper/              # Entity ↔ DTO mappers
│   ├── repository/          # Spring Data JPA repositories
│   ├── security/            # JWT filter, auth utils, security config
│   └── service/             # Business logic layer
├── src/main/resources/
│   └── application.properties
├── frontend/
│   └── src/
│       ├── components/      # Navbar, Layout, ProtectedRoute
│       ├── context/         # AuthContext, ToastContext
│       ├── pages/           # Login, Signup, Categories, Products
│       └── services/        # API layer (axios)
├── API_DOCUMENTATION.md
├── pom.xml
└── README.md
```

---

## ⚙️ Prerequisites

- **Java 21** (JDK)
- **Maven** (or use included `mvnw`)
- **MySQL 8+** running on port `3306`
- **Node.js 18+** & **npm**

---

## 🛠️ Setup & Installation

### 1. Database Setup

Create a MySQL database:

```sql
CREATE DATABASE mydb;
```

> Default credentials in `application.properties`: `root` / `root`
> Update if your MySQL credentials differ.

### 2. Backend

```bash
# From project root
./mvnw spring-boot:run
```

Backend starts at: **http://localhost:8080**

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend starts at: **http://localhost:5173**

---

## 🔐 Authentication & Roles

The app uses **JWT (JSON Web Token)** authentication. On signup, users choose a role:

| Role | Permissions |
|------|------------|
| **USER** | View categories and products only |
| **ADMIN** | Full CRUD on categories and products |

### Auth Flow
1. **Sign up** at `/signup` → choose username, password, and role (User or Admin)
2. **Log in** at `/login` → receive JWT token
3. JWT is stored in `localStorage` and sent with every API request
4. Role is decoded from the JWT payload for frontend access control

---

## 📡 API Endpoints

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/auth/signup` | Public | Create account |
| `POST` | `/auth/login` | Public | Login & get JWT |
| `GET` | `/api/categories` | Authenticated | List all categories |
| `GET` | `/api/categories/{id}` | Authenticated | Get category by ID |
| `POST` | `/api/categories` | ADMIN | Create category |
| `PUT` | `/api/categories/{id}` | ADMIN | Update category |
| `DELETE` | `/api/categories/{id}` | ADMIN | Delete category |
| `GET` | `/api/products` | Public | List all products |
| `GET` | `/api/products/{id}` | Public | Get product by ID |
| `POST` | `/api/products` | ADMIN | Create product |
| `PUT` | `/api/products/{id}` | ADMIN | Update product |
| `DELETE` | `/api/products/{id}` | ADMIN | Delete product |

> 📄 Full API documentation: [`API_DOCUMENTATION.md`](./API_DOCUMENTATION.md)

> 🔗 Swagger UI: [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)

---

## 🎨 Frontend Features

- **Dark glassmorphism theme** with gradient accents and smooth animations
- **JWT authentication** with localStorage persistence
- **Role-based UI** — unauthorized actions show toast error messages
- **Category management** — list, create, edit, delete (ADMIN only)
- **Product management** — list, create, edit, delete (ADMIN only)
- **Toast notifications** for all success/error feedback
- **Responsive design** for mobile and desktop
- **Protected routes** — redirects to login if not authenticated

---

## 🧪 Testing

### Manual Testing
1. Sign up as **USER** → verify you can view but not create/delete
2. Sign up as **ADMIN** → verify full CRUD access on both categories and products
3. Test invalid login → error toast appears
4. Test logout → redirected to login page

### Swagger
Access interactive API testing at:
```
http://localhost:8080/swagger-ui/index.html
```

---

## 📝 Configuration

Key settings in `src/main/resources/application.properties`:

```properties
# Database
spring.datasource.url=jdbc:mysql://localhost:3306/mydb
spring.datasource.username=root
spring.datasource.password=root

# JPA
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# JWT
jwt.secretKey=<your-secret-key>
```

---


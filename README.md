# Finance Data Processing & Access Control Backend

A backend-focused project built with **Node.js, Express, Prisma, and PostgreSQL** that demonstrates:

* **authentication using JWT + cookies**
* **dynamic RBAC (role-based access control)**
* **department-scoped data visibility**
* **financial entry management**
* **analytics APIs**
* **layered backend architecture**
* **request validation + pagination + filtering**

---

# 🚀 Tech Stack

* **Node.js**
* **Express.js**
* **Prisma ORM**
* **PostgreSQL**
* **JWT Authentication**
* **Cookie Parser**
* **Zod Validation**

---

# 📁 Project Structure

```text
src/
├── routes/
│   ├── auth.route.js
│   ├── admin/
│   ├── finance/
│   └── rbac/
│
├── controllers/
├── services/
├── repositories/
│
├── middlewares/
│   ├── authentication.middleware.js
│   ├── departmentscope.middleware.js
│   ├── permission.middleware.js
│   └── validate.middleware.js
│
├── validations/
│   ├── auth.validation.js
│   └── finEntry.validation.js
│
├── utils/
│   └── buildFinEntryFilters.js
│
├── prisma/
└── index.js
```

The project follows a strict **layered architecture**:

> **Route → Controller → Service → Repository → Prisma**

This separation keeps:

* HTTP concerns isolated
* business logic reusable
* database access centralized
* testing easier
* future scaling straightforward

---

# 🔐 Authentication

Authentication is implemented using:

* **JWT tokens**
* **HTTP-only cookies**
* request user injection middleware

## Auth APIs

```http
POST /api/v1/auth/signup
POST /api/v1/auth/login
POST  /api/v1/auth/logout
GET  /api/v1/auth/me
```

### Notes

* users authenticate via JWT cookie
* middleware verifies token and attaches `req.user`
* inactive users are blocked even if JWT is valid
---

# 🛡️ Dynamic RBAC System

One of the strongest parts of this project is the **fully dynamic RBAC design**.

Permissions are modeled as:

> **Role → Operation → AppTable**

Meaning:

> *which role can perform which operation on which table*

This makes permission changes extremely easy.

## Example

An admin can instantly grant:

```text
ANALYST can READ FinEntry
```

by a single API hit.

No hardcoded role logic is required.

## RBAC APIs

```http
POST   /api/v1/rbac/tables
POST   /api/v1/rbac/operations
POST   /api/v1/rbac/permission/roles/:roleId/op/:operationId/tb/:tableId
DELETE /api/v1/rbac/permission/roles/:roleId/op/:operationId/tb/:tableId

GET    /api/v1/rbac/role
POST   /api/v1/rbac/role

POST   /api/v1/rbac/assign/roles/:roleId/users/:userId
DELETE   /api/v1/rbac/assign/roles/:roleId/users/:userId
```

---

# 👥 User, Role, and Department Management

The admin module supports:

* department creation
* category creation
* user activation/deactivation
* user-to-department mapping
* user-to-role mapping

## Admin APIs

```http
GET  /api/v1/admin/departments
POST /api/v1/admin/departments

GET  /api/v1/admin/category
POST /api/v1/admin/category

PATCH /api/v1/admin/users/:userId/status
DELETE /api/v1/admin/users/:userId/

POST   /api/v1/admin/assign-dept/users/:userId/departments/:departmentId
DELETE /api/v1/admin/assign-dept/users/:userId/departments/:departmentId
```

---

# 🏢 Department Scoped Access

A user may belong to **multiple departments**.

The `departmentScope` middleware ensures that:

* normal users only see data from their mapped departments
* department filters are automatically applied
* finance + analytics APIs remain safe

This is implemented using:

```text
middlewares/departmentscope.middleware.js
utils/buildFinEntryFilters.js
```

This design keeps access control:

* reusable
* centralized
* query-safe

---

# 💰 Financial Entry Management

Financial records support:

* create
* read
* update
* soft delete
* filtering
* pagination
* validation

## APIs

```http
GET    /api/v1/finance/entries
POST   /api/v1/finance/entries
PATCH  /api/v1/finance/entries/:id
DELETE /api/v1/finance/entries/:id
```

## Supported Query Filters

```http
GET /api/v1/finance/entries?page=1&limit=10&type=EXPENSE&categoryId=2&startDate=2026-01-01&endDate=2026-03-31
```

### Supported filters

* `page`
* `limit`
* `type`
* `categoryId`
* `startDate`
* `endDate`

Pagination metadata is returned in response.

---

# 📊 Analytics APIs

The assignment required meaningful finance analysis APIs, so the following were implemented:

## APIs

```http
GET /api/v1/finance/analysis/summary
GET /api/v1/finance/analysis/trend
GET /api/v1/finance/analysis/recent-activity
GET /api/v1/finance/analysis/anomalies
```

## Features

### Summary

Returns:

* total income
* total expense
* net balance

### Trend

Supports range-based trend grouping:

* week
* month
* year
* 10 years

### Recent Activity

Returns latest finance activity with filters.

### Anomalies

Detects unusually high expense entries using:

> average expense × 1.5 threshold

---

# ✅ Validation Strategy

Validation is implemented using **Zod**.

## Current validated modules

* auth
* finance entry create/update

## Special business validation

A finance-specific rule was added:

> `categoryId` is optional for `INCOME`
> but required for `EXPENSE`

---

# ⚙️ Setup Instructions

## 1) Install dependencies

```bash
npm install
```

## 2) Configure environment

Create `.env`

```env
PORT=3000
DATABASE_URL=your_postgres_url
JWT_SECRET=your_secret
```

## 3) Prisma setup

```bash
npx prisma generate
npx prisma migrate dev
```

## 4) Run server

```bash
npm run dev
```
---

# 📬 API Documentation (Postman)
A complete Postman collection has been created with folders and request groupings that mirror the project structure and README sections.

It includes:
- Authentication APIs
- RBAC APIs
- Admin APIs
- Financial Entry APIs
- Analytics APIs
- sample request bodies
- query parameter examples
- expected responses

**Postman Documentation Link:**  
https://documenter.getpostman.com/view/40573601/2sBXiqEUUa#c8e09136-c805-4813-975d-c38bce30b742

---

# Key Decisions

1) Dynamic permissions over hardcoded enums

- Allows changing access rules with APIs instead of code edits.

2) Layered architecture

3) Shared filter utility

- A reusable filter builder powers:

* finance listing
* summary
* trends
* anomalies

- This avoids duplicated query logic.

4) Soft delete

- Used for users and finance entries to preserve auditability.

---

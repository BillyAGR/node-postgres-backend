# Node Postgres Backend

Backend API built with Node.js, Express, Sequelize, and PostgreSQL.

This project is configured to run both locally and in production using Render and PostgreSQL.

---

# Technologies Used

* Node.js
* Express.js
* PostgreSQL
* Sequelize ORM
* Sequelize CLI
* Render
* dotenv

---

# Features

* REST API backend architecture
* PostgreSQL integration
* Automatic migrations with Sequelize
* Configurable environment variables
* Render deployment support
* Production-ready configuration
* SSL support for PostgreSQL in production

---

# Project Structure

```bash
.
├── config/
├── db/
│   ├── config.js
│   ├── migrations/
│   ├── models/
│   └── seeders/
├── routes/
├── services/
├── middlewares/
├── schemas/
├── utils/
├── index.js
├── package.json
└── README.md
```

---

# Local Installation

## 1. Clone the repository

```bash
git clone https://github.com/BillyAGR/node-postgres-backend.git
```

## 2. Enter the project directory

```bash
cd node-postgres-backend
```

## 3. Install dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file in the root of the project.

## PostgreSQL Example

```env
PORT=3000

NODE_ENV=development

DB_DIALECT=postgres
SCHEME=postgres

POSTGRES_DB=my_database
POSTGRES_USER=my_user
POSTGRES_PASSWORD=my_password
POSTGRES_HOST=localhost
POSTGRES_PORT=5432

DATABASE_URL=postgresql://my_user:my_password@localhost:5432/my_database
```

---

# Run Migrations

```bash
npm run migrations:run
```

---

# Start the Project

## Development

```bash
npm run dev
```

## Production

```bash
npm start
```

---

# Available Scripts

```bash
npm run dev
npm start
npm run migrations:run
npm run migrations:generate
npm run migrations:revert
```

---

# Deploy on Render

## 1. Create a Web Service

Connect the GitHub repository from Render.

---

## 2. Create PostgreSQL on Render

Create a PostgreSQL instance inside Render.

---

## 3. Configure Environment Variables

In Render → Environment:

```env
NODE_ENV=production

DB_DIALECT=postgres
SCHEME=postgres

POSTGRES_HOST=<render-host>
POSTGRES_PORT=5432
POSTGRES_DB=<database>
POSTGRES_USER=<user>
POSTGRES_PASSWORD=<password>

DATABASE_URL=<internal-database-url>
```

---

## 4. Build Command

```bash
npm install && npm run migrations:run -- --env production
```

---

## 5. Start Command

```bash
npm start
```

---

# PostgreSQL Connection

The project uses Sequelize to connect to PostgreSQL.

Example configuration:

```js
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});
```

---

# Endpoints

## Base URL

```bash
https://node-postgres-backend.onrender.com
```

## Example

```http
GET /api/v1/products
```

---

# Sequelize Migrations

## Create Migration

```bash
npx sequelize-cli migration:generate --name create-users
```

## Run Migrations

```bash
npx sequelize-cli db:migrate
```

## Revert Migrations

```bash
npx sequelize-cli db:migrate:undo
```

---

# Security

* Never upload `.env` files
* Never expose real credentials
* Use SSL in production
* Use environment variables for secrets

Add this to `.gitignore`:

```gitignore
.env
```

---

# Project Status

Functional project deployed on Render with PostgreSQL.

---

# Author

BillyAGR

GitHub:

[https://github.com/BillyAGR](https://github.com/BillyAGR)

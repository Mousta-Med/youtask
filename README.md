# YouTask - Task Management Application

A full-stack task management application built with React (Frontend) and Spring Boot (Backend).

## 🚀 Features

- Create, read, update, and delete tasks
- Task status management (Pending, In Progress, Completed)
- Drag and drop functionality for task organization
- Modern and responsive UI with Tailwind CSS
- RESTful API with OpenAPI documentation
- PostgreSQL database with audit trails

## 🏗️ Project Structure

```
youtask/
├── youtask-fe/          # React frontend application
├── youtask-general-api/ # Spring Boot backend API
├── schema.sql           # Database script
└── README.md            # This file
```

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

### Option 1: Docker Setup 
- **Docker** and **Docker Compose**

### Option 2: Manual Setup
- **Java 20**
- **Node.js 18** or higher
- **npm**
- **PostgreSQL 17**
- **Maven 3.8** or higher

## 🛠️ Setup Instructions

### 🐳 Option 1: Docker Setup

This is the easiest way to run the entire application with a single command.

#### 1. Clone the Repository

##### Option 1: Without security

```bash
git clone https://github.com/Mousta-Med/youtask
cd youtask
```
##### Option 2: With security

```bash
git clone https://github.com/Mousta-Med/youtask
cd youtask
git switch with-security
```

#### 2. Run with Docker Compose

```bash
# Build and start all services
docker compose up --build

# Or run in detached mode
docker compose up --build -d
```

This will start:
- **PostgreSQL Database** on port `5432`
- **Spring Boot API** on port `8080`
- **React Frontend** on port `5173`

#### 3. Access the Application

- **Frontend:** http://localhost:5173
- **API:** http://localhost:8080
- **API Documentation (Swagger):** http://localhost:8080/swagger-ui.html

#### 4. Stop the Application

```bash
# Stop all services
docker compose down

# Stop and remove volumes (this will delete database data)
docker compose down -v
```

### 🔧 Option 2: Manual Setup

#### 1. Clone the Repository

```bash
git clone https://github.com/Mousta-Med/youtask
cd youtask
```

#### 2. Database Setup

##### Install PostgreSQL

- Download and install PostgreSQL from [https://www.postgresql.org/download/](https://www.postgresql.org/download/)
- Start the PostgreSQL service

##### Create Database and User

```sql
-- Connect to PostgreSQL as superuser
psql -U postgres

-- Create database
CREATE DATABASE youtask;

-- Create user (optional, or use existing postgres user)
CREATE USER youtask_user WITH ENCRYPTED PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE youtask TO youtask_user;

-- Exit psql
\q
```

##### Initialize Database Schema

```bash
# Navigate to the root directory
cd youtask

# Run the schema script
psql -U postgres -d youtask -f schema.sql
```

#### 3. Backend Setup (Spring Boot API)

##### Configure Database Connection

Update `youtask-general-api/src/main/resources/application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/youtask
    username: postgres # or your database username
    password: root # update with your database password
    driver-class-name: org.postgresql.Driver
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true # Optional: to see SQL queries in logs
    properties:
      hibernate:
        format_sql: true
```

##### Build and Run the Backend

```bash
# Navigate to API directory
cd youtask-general-api

# Clean and install dependencies
./mvnw clean install

# Run the application
./mvnw spring-boot:run
```

The API will be available at: `http://localhost:8080`

**API Documentation (Swagger):** `http://localhost:8080/swagger-ui.html`

#### 4. Frontend Setup (React Application)

```bash
# Navigate to frontend directory
cd youtask-fe

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at: `http://localhost:5173`

## 📊 Database Schema

The application uses PostgreSQL with the following main table:

- **task**: Stores task information with audit fields
  - `id` (UUID, Primary Key)
  - `title` (VARCHAR 100, NOT NULL)
  - `description` (VARCHAR 500)
  - `status` (ENUM: PENDING, IN_PROGRESS, COMPLETED)
  - `created_by` (VARCHAR 255)
  - `created_date` (TIMESTAMP)
  - `last_modified_by` (VARCHAR 255)
  - `last_modified_date` (TIMESTAMP)

## 🔍 API Endpoints

- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/{id}` - Get task by ID
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/{id}` - Update task
- `DELETE /api/tasks/{id}` - Delete task

For complete API documentation, visit: `http://localhost:8080/swagger-ui.html`

# Task Manager

A full-stack task management web application built with React, Node.js, Express, and MongoDB. Features user authentication, CRUD operations for tasks, filtering by status/priority, and a responsive UI with Tailwind CSS.

## Features

- User authentication (Register/Login) with JWT
- Create, read, update, and delete tasks
- Filter tasks by status and priority
- Search functionality
- User profile management
- Responsive design with Tailwind CSS
- Secure password hashing with bcrypt

## Tech Stack

**Frontend:**
- React 18
- React Router DOM
- Axios
- Tailwind CSS
- Vite

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
- express-validator for input validation

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_jwt_secret_key
```

5. Start the backend server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:
```
VITE_API_URL=http://localhost:5000/api
```

5. Start the frontend development server:
```bash
npm run dev
```

## Usage

1. Open your browser and navigate to `http://localhost:5173`
2. Register a new account or login with existing credentials
3. Start managing your tasks!

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Tasks
- `GET /api/tasks` - Get all tasks (protected)
- `POST /api/tasks` - Create a new task (protected)
- `PUT /api/tasks/:id` - Update a task (protected)
- `DELETE /api/tasks/:id` - Delete a task (protected)



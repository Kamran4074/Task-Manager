# Task Management App

A full-stack MERN application for managing tasks with authentication.

## Tech Stack

- Frontend: React 18, Vite, TailwindCSS, Axios
- Backend: Node.js, Express, MongoDB, Mongoose, JWT

## Setup & Run

### Prerequisites
- Node.js
- MongoDB running locally (`mongodb://localhost:27017`)

### Backend
```bash
cd backend
npm install
npm run dev
```
Runs on http://localhost:5000

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Runs on http://localhost:5173

## Environment Variables

`backend/.env`
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/webapp
JWT_SECRET=your_secret_key
NODE_ENV=development
```

`frontend/.env`
```
VITE_API_URL=http://localhost:5000/api
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |
| GET | /api/auth/me | Get current user |
| GET | /api/tasks | Get all tasks |
| POST | /api/tasks | Create task |
| PUT | /api/tasks/:id | Update task |
| DELETE | /api/tasks/:id | Delete task |

## Features

- JWT authentication with protected routes
- Create, read, update, delete tasks
- Search and filter by status/priority
- User profile management
- Responsive UI

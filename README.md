# Todo API Project

A full-stack Todo application with a Node.js backend and a frontend interface.

## Project Structure

```
my-todo-api/
├── backend/           # Node.js Express backend
├── frontend/         # Frontend application
```

## Backend

The backend is built with Node.js and Express, providing a RESTful API for managing todos.

### Features
- CRUD operations for todos
- RESTful API endpoints
- CORS enabled
- JSON body parsing

### API Endpoints

- `GET /todos` - Get all todos
- `POST /todos` - Create a new todo
- `PUT /todos/:id` - Update an existing todo
- `DELETE /todos/:id` - Delete a todo

### Dependencies
- express: ^5.1.0
- cors: ^2.8.5
- body-parser: ^2.2.0

## Frontend

The frontend application provides a user interface for interacting with the todo API.

## Getting Started

### Prerequisites
- Node.js

### Running the Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   node server.js
   ```

The server will run on `http://localhost:3000`

## Development

The project uses a simple in-memory storage for todos. For production use, consider implementing a database solution.

## License

ISC 
# TaskHive

A modern task management application with a terminal-inspired interface that supports both GUI and command-line workflows.

## Overview

TaskHive combines a Spring Boot backend with an Angular frontend to deliver a responsive, efficient task management experience. The application features both dark and light themes and caters to both traditional users and power users who prefer command-line interactions.

## Core Features

TaskHive offers comprehensive task management capabilities including creation, viewing, updating, and deletion of tasks. Users can mark tasks as complete/incomplete, filter by priority/category/due date, search by title or description, and access upcoming tasks. The application features both a graphical interface and a terminal-style command interface with dark/light theme toggling.

## Tech Stack

**Backend**: Spring Boot 3.x, Spring Data JPA, H2 Database (configurable), Java 23+, Maven  
**Frontend**: Angular 19, TypeScript, RxJS, Angular Material, CSS Custom Properties

## Quick Start

### Prerequisites
- Java 23+, Maven
- Node.js 20+, npm 10+

### Backend Setup
```bash
git clone https://github.com/PrajwalAmte/TaskHive.git
cd TaskHive
mvn clean install
mvn spring-boot:run
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

The application will be available at http://localhost:4200 with the API at http://localhost:8080.

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /api/tasks | Get all tasks |
| POST   | /api/tasks | Create a new task |
| DELETE | /api/tasks/{id} | Delete a task |
| PUT    | /api/tasks/{id}/toggle | Toggle task completion |
| GET    | /api/tasks/search | Search tasks |
| GET    | /api/tasks/priority/{priority} | Get tasks by priority |
| GET    | /api/tasks/category/{category} | Get tasks by category |
| GET    | /api/tasks/due-date/{date} | Get tasks by due date |
| GET    | /api/tasks/upcoming | Get upcoming tasks |

## Command Bar

TaskHive's command bar supports various commands for efficient navigation and task management:

| Command | Description |
|---------|------------|
| `help` | Show commands |
| `ls` | List tasks |
| `add` | New task |
| `priority <level>` | Filter by priority |
| `search <query>` | Search tasks |
| `today` | Today's tasks |

## Project Structure

The project follows a clean architecture with clear separation of concerns:

**Backend (TaskHive-API)**: Contains controllers, models, repositories, and services organized in a standard Spring Boot structure.

**Frontend (TaskHive-UI)**: Organized into core (components, services, models), features (task-specific modules), and shared resources.

## Development

**Backend**: Use IntelliJ IDEA or Eclipse. Run tests with `mvn test`. API documentation available at `/swagger-ui.html`.

**Frontend**: Use Visual Studio Code with recommended extensions. Run tests with `ng test`, build with `ng build --prod`, and lint with `ng lint`.

## Contributing

Contributions are welcome! Fork the repository, create a feature branch (`feature/my-feature`), make your changes, and submit a pull request.

## License

This project is licensed under the MIT License.

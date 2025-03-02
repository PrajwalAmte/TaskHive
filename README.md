# Task Manager (Spring Boot)

## Description

A simple **Task Manager** built with **Spring Boot, Spring Data JPA, and Thymeleaf**. This application allows users to create, view, mark as complete, and delete tasks using a web interface.

## Features

- Add tasks with a **title, description, and due date**.
- View all tasks in a structured format.
- Mark tasks as **completed or pending**.
- Delete tasks easily.
- Uses **Spring Boot MVC** and **Spring Data JPA** for backend operations.
- UI built with **Thymeleaf**.

## Tech Stack

- **Spring Boot** (Spring MVC, Spring Data JPA)
- **H2 Database** (or any configured relational database)
- **Thymeleaf** (for frontend rendering)
- **Maven** (for dependency management)

## Installation

### Prerequisites

Ensure you have the following installed:

- **Java 23+**
- **Maven**
- **Spring Boot**

### Steps to Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/PrajwalAmte/TaskHive.git
   cd TaskHive
   ```
2. **Build the project:**
   ```bash
   mvn clean install
   ```
3. **Run the application:**
   ```bash
   mvn spring-boot:run
   ```
4. **Access the application:**
   - Open a browser and go to: `http://localhost:8080/tasks`

## API Endpoints

| HTTP Method | Endpoint             | Description              |
| ----------- | -------------------- | ------------------------ |
| `GET`       | `/tasks`             | View all tasks           |
| `POST`      | `/tasks`             | Add a new task           |
| `GET`       | `/tasks/{id}/toggle` | Toggle completion status |
| `GET`       | `/tasks/{id}/delete` | Delete a task            |

## Folder Structure

```
├── src/main/java/com/TaskHive
│   ├── controller/TaskController.java
│   ├── model/Task.java
│   ├── repository/TaskRepository.java
│   ├── service/TaskService.java
├── src/main/resources/templates/
│   ├── index.html (Home page)
│   ├── tasks.html (Task List)
├── application.properties
├── pom.xml
```

## Contribution

Feel free to contribute! Fork the repository, make your changes, and submit a pull request.


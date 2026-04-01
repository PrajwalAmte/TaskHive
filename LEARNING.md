# Learning Notes: TaskHive

## Purpose

TaskHive was developed as a practical learning project focused on building a complete full-stack application with:

- Spring Boot for backend APIs and persistence
- Angular for frontend UI and interaction workflows
- MySQL for relational data storage

## Spring Boot Learnings

- Designing a layered architecture with controller, service, and repository responsibilities
- Building RESTful endpoints for create, read, update, delete, and filtering workflows
- Using Spring Data JPA to map entities and manage persistence with minimal boilerplate
- Configuring CORS for frontend-backend integration during local development
- Managing environment-driven datasource configuration for local database setup

## Angular Learnings

- Structuring a feature-based application with reusable shared components
- Implementing route-based pages for list, create, edit, and filtered task views
- Building responsive UI flows with component state and service-based data access
- Creating command-style interactions for quick filtering and navigation
- Using interceptors and centralized services for API error handling and notifications

## Full-Stack Integration Learnings

- Connecting Angular services to Spring Boot endpoints with consistent DTO/model mapping
- Handling asynchronous request flows and UI refresh patterns after CRUD operations
- Verifying backend and frontend behavior together while iterating on API contracts
- Managing theme behavior and ensuring dark/light consistency across key screens

## Challenges Addressed

- Keeping API contracts stable while frontend feature pages evolved
- Maintaining clear separation of concerns to reduce coupling across layers
- Handling database setup changes without blocking day-to-day development
- Preserving usability while adding terminal-inspired command workflows

## Outcomes

- Stronger understanding of how Spring Boot and Angular fit together in real projects
- Better confidence in full-stack debugging across UI, API, and database layers
- Reusable project structure that can scale to additional features and modules

## Next Learning Steps

- Add authentication and role-based access control
- Add backend validation and stronger API error contracts
- Add frontend and backend automated test coverage
- Add CI checks for build, test, and lint workflows

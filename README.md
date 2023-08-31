# Project Name

This is a Fastify API project that follows the principles of clean architecture. The project's structure is organized into different layers to promote modularity and maintainability.

## Table of Contents

- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Routes](#routes)
- [Scripts](#scripts)
- [Database Migration](#database-migration)
- [Contributing](#contributing)
- [License](#license)

## Project Structure

The project is organized into the following folders:

- `src/application/useCases`: Contains the application's use cases.
- `src/domain`: Contains the domain layer with exceptions, models, and repositories.
- `src/infrastructure/database`: Holds the database-related code.
- `src/presentation/api/controllers`: Houses the API controllers.
- `src/presentation/api/routes`: Contains API route definitions.

## Installation

1. Clone this repository to your local machine.
2. Navigate to the project directory: `cd ${project-name}`.
3. Install the required dependencies: `npm install`.

## Standalone Usage

To run the project, execute the following command:

```sh
npm start
```

This will lint the source code, build the TypeScript files, and start the application using Node.js.

For development purposes, you can use the following command to start the application using `ts-node`:

```sh
npm run start:dev
```

## Routes

The API routes are defined in the `src/presentation/api/routes` directory. Here is a list of available routes along with the required parameters and their types:

- `GET /todo`: Retrieves a todo item list

- `GET /todo/:id`: Retrieves a todo item by its ID.
  - `id`: ID of the todo item to retrieve. (Type: string)
  
- `POST /todo`: Create a new todo item.
  - Request Body Schema: `todoPostValidationSchema`
    - `description`: Description of the todo item. (Type: string)
    - `completed`: Completion status of the todo item. (Type: boolean)

- `PUT /todo/:id`: Update an existing todo item by its ID.
  - `id`: ID of the todo item to update. (Type: string)
  - Request Body Schema: `todoPutValidationSchema`
    - At least one of the following properties should be included:
      - `description`: Updated description of the todo item. (Type: string)
      - `completed`: Updated completion status of the todo item. (Type: boolean)

- `DELETE /todo/:id`: Delete a todo item by its ID.
  - `id`: ID of the todo item to delete. (Type: string)

Each route is associated with a specific controller in the `src/presentation/api/controllers` directory.

## Scripts

- `lint`: Run ESLint on the source code for code style and formatting.
- `build`: Build the TypeScript source files using the `tsc` compiler.
- `start`: Lint, build, and start the application using Node.js.
- `start:dev`: Start the application in development mode using `ts-node`.
- `test`: Placeholder script for running tests (you can replace this with your test setup).
- `migrate`: Run database migrations using `postgrator` with provided environment variables.
- `migrate:clean`: Rollback migrations to version 0.

## Database Migration

Database migrations can be managed using the `migrate` and `migrate:clean` scripts. Ensure you have the required environment variables set for the migrations to work correctly.

```sh
npm run migrate       # Run migrations
npm run migrate:clean # Rollback migrations to version 0
```
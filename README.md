## Getting Started

This project makes use of Yarn Workspaces to be able to share interfaces between the two projects.

### Prerequisites

- Node: `v18.12.0`
- Yarn: `v3.5`
- Docker Compose: `v1.25.0`

To learn how to use this monorepo you can check out [Yarn Workspace Documentation](https://yarnpkg.com/features/workspaces/#gatsby-focus-wrapper).

### Running Locally.

To run the following project locally, you must have a local Postgres instance. You can run the `docker-compose.yml` to easily run such instance. To do so, follow the next steps:

1. Make sure to install the indicated Docker Compose version specified in the Prerequisites section.
2. Run `yarn install` to install all project's dependencies.
3. At the project's backend (located at `./packages/backend/`), create an `.env` file with the following values:
```dotenv
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=nicasource
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
```
4. Run the following command: `yarn run backend-dev`. This command will: Call `docker-compose`, run migrations on the backend, and call Nodemon in order to start `dev` mode.

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
2. At the project's directory (root), create and `.env` file with the following values:
```
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
```
3. Run the following command: `docker-compose up`

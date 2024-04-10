<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>



# Backend Application for Items List

This project is a backend application that provides CRUD (Create, Read, Update, Delete) operations for managing items, lists, and itemList entities. It also includes an authentication system with JSON Web Tokens (JWT), role-based authorization, pagination, and GraphQL API.

## Features

- **CRUD Operations:** Perform Create, Read, Update, and Delete operations for items, lists, and itemList entities.
- **Authentication System:** Secure endpoints using JWT for authentication.
- **Role-Based Authorization:** Implement role-based access control to restrict access to certain endpoints based on user roles.
- **Pagination:** Implement pagination to efficiently handle large datasets, improving performance and user experience.
- **GraphQL API:** Expose a GraphQL API for flexible querying of data.

## Technologies Used

- **NestJS:** A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **TypeORM:** An Object-Relational Mapping (ORM) library for TypeScript and JavaScript.
- **PostgreSQL:** A powerful, open-source relational database system.
- **Docker:** A platform for developing, shipping, and running applications in containers.
- **TypeScript:** A statically typed superset of JavaScript that compiles to plain JavaScript.
- **GraphQL:** A query language for APIs and a runtime for executing those queries.

## Getting Started

1. **Clone the Project:** Clone the repository to your local machine `git clone`.
2. **Copy the `.env.template` file:** Duplicate the `env.template` file and rename it to `.env` and fill the fields.
3. **Install Dependencies:** Run `yarn` to install all project dependencies.
4. **Run the Docker container:** Ensure Docker is installed, then run a Docker container using `docker-compose up -d`.
5. **Run the Nest Backend:** Start the Nest backend by running `yarn dev`.
6. **Access GraphQL Playground:** Navigate to `http://localhost:3000/graphql` in your browser.
7. **Execute Seed Mutation:** Execute the mutation `executeSeed` in GraphQL Playground to populate the database with information.
8. **Test the queries:** Ones you have populate the data. Log in with email and password then provide the token in the headers `header key: Authorization` and `value: Bearer token`
9. **Production:** If you wish run in production just run the `docker compose -f ./docker-compose.prod.yml up -d`


## Usage

- **API Documentation:** Explore available endpoints and their usage `http://localhost:3000/graphql`.

## Authentication and Authorization

- **Authentication:** Users must authenticate using JWT to access protected endpoints.
- **Authorization:** Access to certain endpoints is restricted based on user roles (e.g., admin, user).

## GraphQL API

- **GraphQL API:** Expose a GraphQL API for flexible querying of data. Access the GraphQL playground at `/graphql` endpoint.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your improvements.

## License

This project is licensed under the [MIT License](LICENSE).

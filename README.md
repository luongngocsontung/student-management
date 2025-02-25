# Education Connection Backend

## Overview

Education connection is a backend service designed to help teachers perform administrative functions for their students. It's built using the NestJS framework, offering robust API endpoints for clients.

## Table Of Content

- [Overview](#overview)
- [Table Of Content](#table-of-content)
- [Approach](#approach)
  - [Technologies](#technologies)
  - [Generate source structure](#generate-source-structure)
  - [Choose a development method](#choose-a-development-method)
  - [Develop APIs and unit test](#develop-apis-and-unit-test)
  - [More ideas](#more-ideas)
- [Tech stacks](#tech-stacks)
- [Test coverage](#test-coverage)
- [How to run](#how-to-run)
  - [Pre-requisites](#pre-requisites)
  - [Installation](#installation)
  - [Environment setup](#environment-setup)
  - [Run docker compose](#run-docker-compose)
  - [Seeding](#seeding)
- [Development](#development)
- [Production](#production)
- [How to test](#how-to-test)
  - [Import Postman collection](#import-postman-collection)
  - [Call the first api](#call-the-first-api)
- [Note](#note)
- [Contact](#contact)

## Features

- Teacher can register students.
- Teacher can retrieve a list of students common to a given list of teachers.
- Teacher can suspend a specified student.
- Teacher can retrieve a list of students who can receive a given notification.

## Approach

### Technologies

- Choose a library or framework to develop APIs.
- There are many options for this such as ExpressJS, NestJS, etc.

### Generate source structure

- Depend on requirement or project scope, choose a template or structure for this project.
- There are many options such as 3-layers architecture, module architecture, etc.

### Choose a development method

- Think about TDD (Test-driven development) or TLD (Test-Last development).

### Develop APIs and unit test

- Following the requirements, develop APIs to implement features.
- Write unit test to verify apis.

### More ideas

- Implement security with authentication, authorization.
- Tracing with log.
- Deploy app.

## Tech stacks

- **Backend Framework**: NestJS
- **Database**: MySQL with Prisma
- **Testing**: Jest
- **Code Formatting and Linting**: ESLint, Prettier

## How to run

### Pre-requisites

- Node.js v18.19.0
- Docker
- Postman

### Installation

To install the project, follow these steps:

```bash
git clone https://github.com/luongngocsontung/student-management.git
cd student-management
```

### Environment setup

To run this project, you will need to set up the following environment variables. You can do this by creating a `.env` file in folder `student-management`.

```plaintext
# ----- GENERAL -------
NODE_ENV=DEV
NODE_PORT=3000

# ----- DATABASE ------
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_NAME=dbname
DATABASE_USERNAME=root
DATABASE_PASSWORD=root
DATABASE_ROOT_PASSWORD=root
DATABASE_URL=mysql://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}
```

### Run docker compose

At folder `student-management`, to build, start and run services:

```bash
docker-compose up
```

### Seeding

After the server is successfully up and running, you can proceed with running the seeding process.

```
docker exec -it nestjs_app npm run db:seed
```

## Development

### Database Migrations

To run migrations:

```bash
npm run db:deploy
```

### Seeding

To run for seeding:

```bash
npm run db:seed
```

### Start application

```bash
npm run start:dev
```

### Run test

To run tests:

```bash
npm run test
```

### Running and checking coverage

```bash
npm run test:cov
```

### Build application

```bash
npm run build
```

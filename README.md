# Student management

## Overview

- This project is a student management app.
- The app is a simple app for managing students and teachers.

## Table Of Content

- [Overview](#overview)
- [Table Of Content](#table-of-content)
- [Features](#features)
- [Tech stacks](#tech-stacks)
- [Code structure](#code-structure)
- [Test coverage](#test-coverage)
- [How to run](#how-to-run)
  - [Pre-requisites](#pre-requisites)
  - [Installation](#installation)
  - [Environment setup](#environment-setup)
  - [Run docker compose](#run-docker-compose)
  - [Seeding](#seeding)
    - [Teacher seeding](#table-teachers)
    - [Student seeding](#table-students)
- [Other commands](#other-commands)

## Features

- Teacher can register students.
- Teacher can retrieve a list of students common to a given list of teachers.
- Teacher can suspend a specified student.
- Teacher can retrieve a list of students who can receive a given notification.

## Tech stacks

- **Backend Framework**: NestJS
- **Database**: MySQL with Prisma
- **Testing**: Jest
- **Code Formatting and Linting**: ESLint, Prettier

## Code structure

```tree
...
├── prisma
│   ├── migrations
│   ├── schema.prisma
│   └── seed.ts
├── src
│   ├── __mocks__
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── config
│   ├── constants
│   ├── logger
│   │   └── logger.middleware.ts
│   ├── main.ts
│   ├── prisma
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts
│   ├── repositories
│   │   ├── repository.module.ts
│   │   ├── student.repo.ts
│   │   ├── teacher-on-student.repo.ts
│   │   ├── teacher.repo.ts
│   │   └── tests
│   ├── teacher
│   │   ├── dtos
│   │   │   ├── index.ts
│   │   │   └── request
│   │   ├── teacher.controller.spec.ts
│   │   ├── teacher.controller.ts
│   │   ├── teacher.module.ts
│   │   ├── teacher.service.spec.ts
│   │   └── teacher.service.ts
│   ├── types
│   └── utils
...
```

## How to run

### Pre-requisites

- Docker
- Docker Compose

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
docker compose up
```

### Seeding

After the server is successfully up and running, you can proceed with running the seeding process.

```
docker exec -it nestjs_app npm run db:seed
```

After the seeding process is completed, data will be inserted into the database as follows:

#### Table teachers:

| id  | email                  |
| --- | ---------------------- |
| 1   | teacherken@gmail.com   |
| 2   | teacherjoe@gmail.com   |
| 3   | teacherDuc@gmail.com   |
| 4   | teacherHoang@gmail.com |

#### Table students:

| id  | email                                    |
| --- | ---------------------------------------- |
| 1   | studentjon@gmail.com                     |
| 2   | studenthon@gmail.com                     |
| 3   | commonstudent1@gmail.com                 |
| 4   | commonstudent2@gmail.com                 |
| 5   | student_only_under_teacher_ken@gmail.com |
| 6   | studentmary@gmail.com                    |
| 7   | studentagnes@gmail.com                   |
| 8   | studentmiche@gmail.com                   |
| 9   | studentbob@gmail.com                     |

## Other commands

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

### Start application in watch-mode

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

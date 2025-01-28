# Nooro-Backend

## Getting Started

This project uses Docker for setting up the local MySQL database, Prisma for database migrations, and Node.js for the backend server. Follow the instructions below to get everything running on your local machine.
Create a copy of .env from the .envExample
*should only be the local databaseURL

### 1. Start the Local MySQL Database with Docker

To spin up the local MySQL container, run the following command:

    npm run docker

This will use Docker Compose to start the MySQL container based on the configuration in your `compose-local.yaml` file.

### 2. Set Up the Backend Server

After the database is running, follow these steps to start the backend server:

#### Install Dependencies

Install the required Node.js dependencies by running:

    npm install

Alternatively, if you’re using `pnpm`, you can run:

    pnpm install

#### Run Prisma Migrations
To apply any pending database migrations with Prisma, run:

    pnpm prisma generate
    pnpm prisma migrate dev

This will ensure your database schema is up-to-date with the current model definitions.

To view the prisma database on the web interface http://localhost:5555 you can run

    pnpm prisma studio

#### Build the Project

Build the project using:

    npm run build

#### Start the Server

Finally, start the server with:

    npm run start

Your backend server should now be up and running on http://localhost:4000, connected to the local MySQL database.



# bingwa-services-assessment

## Table of Contents

- [Introduction](#introduction)
- [Project Structure](#project-structure)
- [Requirements](#requirements)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Frontend](#frontend)
- [Backend](#backend)
- [Database Migrations](#database-migrations)
- [Seeding the Database](#seeding-the-database)
- [Logins](#logins)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Introduction

The **bingwa-services-assessment** project is a full-stack application with a Vue frontend and a NestJS backend. This repository contains all necessary code and configurations to run the application locally.

## Project Structure

```
/bingwa-services-assessment
|-- /bingwa-backend
|   |-- ... (NestJS backend code)
|-- /bingwa-frontend
|   |-- ... (Vue frontend code) 
|-- README.md
```

## Requirements

Before running the application, ensure you have the following installed on your machine:

- Node.js (v14 or later)
- npm (Node Package Manager) 
- A database system (e.g., PostgreSQL, MySQL, etc.) depending on your backend configuration

## Installation

### Cloning the Repository

Clone the repository to your local machine using:

```bash
git clone https://github.com/Silvokyda/bingwa-services-assessment.git
cd bingwa-services-assessment
```

### Backend Setup 

Navigate to the backend directory:

```bash
cd bingwa-backend
```

Install the dependencies:

```bash
npm install
```

### Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd bingwa-frontend
```

Install the dependencies:

```bash
npm install
```

## Running the Application

### Frontend

To run the Vue frontend:

1. Navigate to the frontend directory (if not already there):

```bash
cd bingwa-frontend
```

2. Start the development server:

```bash
npm run dev
```

3. Open your web browser and go to `http://localhost:5173` (or the port specified in your configuration).

### Backend

To run the NestJS backend:

1. Open a new terminal and navigate to the backend directory:

```bash
cd bingwa-backend
```

2. Run the database migrations:

```bash
npm run migration:run
```

3. Seed the database:

```bash
npm run seed
```

4. Start the backend server:

```bash
npm run start
```

The backend should now be running on `http://localhost:3000` (or the port specified in your configuration).

## Database Migrations

To run database migrations for the backend, use the following command:

```bash
npm run migration:run
```

Ensure your database is correctly configured in your environment settings before running migrations.

## Seeding the Database

To populate the database with initial data, run:

```bash
npm run seed
```

This command will insert predefined data into your database.

## Logins

Here are the login credentials for different user roles:

- **Manager**
  - Email: `charlie.manager@example.com`
  - Password: `manager123`

- **Engineer**
  - Email: `bob.engineer@example.com`
  - Password: `engineer123`

- **Admin**
  - Email: `alice.admin@example.com`
  - Password: `admin123`

## Troubleshooting

- **Port Conflicts**: If you encounter port conflicts, ensure the specified ports are not already in use by other applications. You can change the ports in the respective configuration files.
- **Database Connection Issues**: Check your database connection settings in the backend configuration file. Ensure your database service is running.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
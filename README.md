# Habitify

**Habitify** is a simple habit management project built using PostgreSQL, Express, React and TypeScript.  

## Requirements
Before getting started, ensure you have the following prerequisites installed:

- **Bun**: A fast JavaScript runtime (https://bun.sh/)
- **PostgreSQL**: A running PostgreSQL database instance with:
  - Database name: `habitify`
  - Username: `admin`
  - Password: `admin123`  
  *(You can adjust these configurations in `db/db.ts`)*

## Setup Instructions

### 1. Initial Setup
Before running the application for the first time:

1. Install dependencies:
   Use ```bun install``` in both the main project folder and the `frontend` folder.

2. Prepare the database:
   Run ```bun run db/prepare.ts``` to set up the necessary database tables and schema.

3. Build the project:
   - On Linux/macOS:  
     Use ```./build.sh```
   - On Windows:  
     Use ```build.bat```

### 2. Running the Application
To start the project, use the following command in the main folder:
Use `bun run index.ts`

## Project Structure
- **Backend**: Built with Node.js, Bun, and Express.
- **Frontend**: Built with React and TypeScript.
- **Database**: Managed with PostgreSQL.

## Customization
Database credentials and configurations can be modified in `db/db.ts`. Ensure the PostgreSQL instance reflects these changes.
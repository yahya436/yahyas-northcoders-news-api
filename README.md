# Northcoders News API

## Setup Instructions

Follow these steps to set up the project locally:

### 1. Clone the Repository
Clone this repository to your local machine:
git clone <YOUR_REPO_URL>
cd northcoders-news-api

### 2. Install Dependencies
Run the following command to install all required dependencies:
npm install

### 3. Create Environment Variables
You will need two `.env` files to connect to the development and test databases:
- `.env.development`
- `.env.test`

Each file should contain the following line:
PGDATABASE=<database_name>

Replace `<database_name>` with the corresponding database name from the `/db/setup.sql` file:
- **For `.env.development`**: Use the development database name.
- **For `.env.test`**: Use the test database name.

### 4. Database Setup
1. Ensure PostgreSQL is installed on your system.
2. Create the databases by running the SQL commands provided in the `/db/setup.sql` file. You can run this file using:
   psql -f db/setup.sql

### 5. Seeding the Database
Seed the development database with sample data:
npm run seed

### 6. Running Tests
Run the tests to ensure the API works as expected:
npm test

### 7. Start the Server
Start the API server locally:
npm start

The server will be available at `http://localhost:3000`.

<!-- Create two .env files in the root directory:

.env.development
.env.test

Add the following content to their respective file:

PGDATABASE= nc_news

PGDATABASE= nc_news_test

Ensure these .env files are included in the .gitignore file to protect sensitive information. -->





--- 

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)

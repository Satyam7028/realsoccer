Real Soccer: Your Ultimate Football Hub
Real Soccer is a comprehensive web-based application designed to be your go-to platform for all things football. It provides up-to-date information on players, leagues, news, and fixtures, alongside an integrated e-commerce platform for purchasing merchandise.

Table of Contents
Features

Project Structure

Getting Started

Prerequisites

Installation

Running the Application

API Documentation

Contributing

License

Contact

Features
User-Facing

User Authentication: Secure registration and login.

Browse & View: Explore players, leagues, fixtures, and news articles.

Statistics: View detailed player and league statistics, including league tables and top scorers.

Schedules & Results: Access fixture schedules and real-time results.

Merchandise Shop: Browse and purchase official football merchandise.

User Profile: Manage personal information and view order history.

Informational Pages: "Contact Us" and "About Us" pages.

Admin-Facing

Dashboard: Overview with key metrics and statistics.

Management: Comprehensive management tools for users, players, leagues, fixtures, news, products, and orders.

Reporting: Generate various reports for insights.

Project Structure
The project is organized into a monorepo with separate client (React frontend) and server (Node.js/Express backend) directories, along with shared configurations and infrastructure definitions.

realsoccer/
├── README.md
├── LICENSE
├── .env.example
├── .gitignore
├── package.json
├── docker-compose.yml
├── .github/
├── scripts/
├── docs/
├── shared/
├── server/
│   ├── src/
│   └── tests/
├── client/
│   ├── public/
│   ├── src/
│   └── tests/
├── infrastructure/
└── tests/e2e/

Getting Started
Follow these instructions to set up and run the Real Soccer application on your local machine.

Prerequisites

Before you begin, ensure you have the following installed:

Node.js (LTS version recommended)

npm (comes with Node.js)

Docker and Docker Compose (for containerized setup)

Installation

Clone the repository:

git clone [https://github.com/Satyam7028/realsoccer.git]
cd realsoccer

Install dependencies for both client and server:

npm run install:all

Configure Environment Variables:
Copy the example environment files and fill in your details.

cp .env.example .env
cp server/.env.example server/.env
cp client/.env.example client/.env

Edit the .env files in the root, server/, and client/ directories with your specific configurations (e.g., database credentials, JWT secret).

Example .env (root):

NODE_ENV=development
CLIENT_PORT=3000
SERVER_PORT=5000
MONGO_PORT=27017

Example server/.env:

NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/realsoccer_db # Or use Docker Compose for connection
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=1h
# Add other server-specific variables

Example client/.env:

REACT_APP_API_URL=http://localhost:5000/api

Running the Application

You have two main options to run the application: using Docker Compose (recommended for development and production parity) or running client and server separately.

Option 1: Using Docker Compose (Recommended)

This method will spin up all services (MongoDB, Server, Client) in isolated containers.

Build and run the Docker containers:

docker-compose up --build

This command will build the Docker images for your client and server, and then start all services defined in docker-compose.yml.

Access the application:

Frontend: http://localhost:3000 (or your CLIENT_PORT)

Backend API: http://localhost:5000/api (or your SERVER_PORT)

Option 2: Running Client and Server Separately (Local Development)

This method is useful if you prefer to run the services directly on your host machine.

Start the Backend Server:
Navigate to the server directory and start the development server.

cd server
npm run dev

The server will typically run on http://localhost:5000.

Start the Frontend Client:
Open a new terminal, navigate to the client directory, and start the React development server.

cd client
npm start

The client will typically open in your browser at http://localhost:3000.

API Documentation
The API specifications are documented using Swagger/OpenAPI. Once the server is running, you can access the interactive API documentation at:
http://localhost:5000/api-docs (or your SERVER_PORT/api-docs)

Contributing
We welcome contributions! Please see the CONTRIBUTING.md file for guidelines on how to contribute to this project.

License
This project is licensed under the MIT License. See the LICENSE file for details.

Contact
For any questions or inquiries, please open an issue on the GitHub repository or contact jadhavsatyam9611@gmail.com
#!/bin/bash

# realsoccer/scripts/reset-db.sh
# This script is used to reset the MongoDB database.
# USE WITH EXTREME CAUTION: This will delete all data in the specified database.

# Load environment variables from server/.env
# This ensures we use the correct MONGO_URI
if [ -f "./server/.env" ]; then
  export $(grep -v '^#' ./server/.env | xargs)
else
  echo "Error: server/.env file not found. Please ensure it exists."
  exit 1
fi

# Extract database name from MONGO_URI
DB_NAME=$(echo $MONGO_URI | sed -n 's/.*\/\([^?]*\)\(\?.*\)\?/\1/p')
if [ -z "$DB_NAME" ]; then
  echo "Error: Could not extract database name from MONGO_URI."
  exit 1
fi

echo "Attempting to reset MongoDB database: $DB_NAME"

# Use mongo shell to drop the database
# Assumes mongo shell is installed and accessible in PATH
# If running inside Docker, ensure `mongo` client is available in the container
# For Docker Compose, you might run this as:
# docker-compose exec mongodb mongosh --eval "db.dropDatabase()" -u <user> -p <password> --authenticationDatabase admin
# Or if using a simple local mongo instance:
mongo --eval "db.dropDatabase()" "$DB_NAME"

if [ $? -eq 0 ]; then
  echo "Database '$DB_NAME' successfully reset."
else
  echo "Failed to reset database '$DB_NAME'. Ensure MongoDB is running and MONGO_URI is correct."
  echo "If using Docker Compose, try 'docker-compose exec mongodb mongosh --eval \"db.dropDatabase()\" -u <user> -p <password> --authenticationDatabase admin'"
  exit 1
fi
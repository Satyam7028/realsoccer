# Use an official Node.js runtime as a parent image
FROM node:18-alpine as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if any)
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app for production
RUN npm run build

# Use a lightweight web server to serve the static files
FROM nginx:alpine

# Copy the built React app from the build stage to Nginx's public directory
COPY --from=build /app/build /usr/share/nginx/html

# Remove default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom Nginx configuration (if you have one, otherwise Nginx will serve index.html by default)
# For this project, we'll assume a basic setup where Nginx serves the React app directly.
# If you add realsoccer/infrastructure/nginx/realsoccer.conf later, you would copy it here:
# COPY infrastructure/nginx/realsoccer.conf /etc/nginx/conf.d/realsoccer.conf

# Expose the port Nginx listens on
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
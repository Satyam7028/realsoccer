Real Soccer Application Deployment Guide
This document outlines the various deployment strategies for the Real Soccer application, covering local development, containerized deployment using Docker Compose, and a production-ready setup with Kubernetes.

Table of Contents
Local Development Deployment

Docker Compose Deployment

Kubernetes Deployment

Prerequisites

Building Docker Images

Applying Kubernetes Manifests

Accessing the Application

Continuous Deployment (CD)

Environment Variables

Post-Deployment Steps

1. Local Development Deployment
For local development, you can run the client and server applications separately on your host machine. This is ideal for rapid iteration and debugging.

Steps:

Ensure Prerequisites:

Node.js (v18+) and npm

MongoDB installed and running locally (e.g., via mongod command or a local MongoDB Atlas instance)

Clone the repository:

git clone [your-repo-url]
cd realsoccer

Install dependencies:

npm run install:all

Configure environment variables:

Create server/.env from server/.env.example

Create client/.env from client/.env.example

Ensure MONGO_URI in server/.env points to your local MongoDB instance (e.g., mongodb://localhost:27017/realsoccer_db).

Ensure REACT_APP_API_URL in client/.env points to your local server (e.g., http://localhost:5000/api).

Start the Backend Server:

cd server
npm run dev # Uses nodemon for auto-restarts

The server will typically run on http://localhost:5000.

Start the Frontend Client (in a new terminal):

cd client
npm start

The client application will typically open in your browser at http://localhost:3000.

2. Docker Compose Deployment
Docker Compose is the recommended method for local development and testing, as it provides a consistent, isolated environment for all services (MongoDB, Server, Client).

Steps:

Ensure Prerequisites:

Docker and Docker Compose installed.

Clone the repository:

git clone [your-repo-url]
cd realsoccer

Configure root environment variables:

Create .env from .env.example in the root directory.

Set CLIENT_PORT, SERVER_PORT, MONGO_PORT.

Crucially, define MongoDB credentials for Docker Compose:

# .env (root)
MONGO_ROOT_USERNAME=realsoccer_user
MONGO_ROOT_PASSWORD=realsoccer_password
# ... other variables

Note: The server/.env and client/.env files are not strictly needed when using Docker Compose if all variables are passed via docker-compose.yml. However, they are good for local-only setups.

Build and run the Docker containers:

docker-compose up --build

This command will build the Docker images for your client and server (using their respective Dockerfiles) and then start all services defined in docker-compose.yml.

Access the application:

Frontend: http://localhost:3000 (or your configured CLIENT_PORT)

Backend API: http://localhost:5000/api (or your configured SERVER_PORT/api)

Swagger UI: http://localhost:5000/api-docs

3. Kubernetes Deployment
For production deployments, Kubernetes provides robust orchestration, scaling, and self-healing capabilities.

Prerequisites

A Kubernetes cluster (e.g., Minikube, GKE, EKS, AKS).

kubectl configured to connect to your cluster.

Docker Hub account (or another container registry) to push images.

Building Docker Images

Before deploying to Kubernetes, you need to build and push your Docker images to a container registry.

Build Server Image:

docker build -t your-dockerhub-username/realsoccer-server:latest ./server

Build Client Image:

docker build -t your-dockerhub-username/realsoccer-client:latest ./client

Push Images to Docker Hub:

docker push your-dockerhub-username/realsoccer-server:latest
docker push your-dockerhub-username/realsoccer-client:latest

Note: Update the image names in infrastructure/kubernetes/deployment.yaml to point to your pushed images.

Applying Kubernetes Manifests

The infrastructure/kubernetes/ directory contains the necessary YAML manifests.

Deploy MongoDB (if not using a managed service):
For production, it's highly recommended to use a managed MongoDB service (e.g., MongoDB Atlas) rather than deploying MongoDB directly in Kubernetes. If you must deploy it in-cluster, you'll need a stateful set and persistent volume claims, which are not included in the basic deployment.yaml for the app.

Create Kubernetes Secrets (for sensitive environment variables):
Do NOT hardcode secrets in your YAML files. Create Kubernetes Secrets.

kubectl create secret generic realsoccer-server-secrets \
  --from-literal=MONGO_URI="mongodb://<mongo-user>:<mongo-password>@<mongo-host>:27017/realsoccer_db?authSource=admin" \
  --from-literal=JWT_SECRET="your_production_jwt_secret" \
  # Add other server secrets here
kubectl create secret generic realsoccer-client-secrets \
  --from-literal=REACT_APP_API_URL="http://your-production-api-url/api"

Reference these secrets in your deployment.yaml.

Apply Deployments and Services:

kubectl apply -f infrastructure/kubernetes/deployment.yaml
kubectl apply -f infrastructure/kubernetes/service.yaml

This will create the deployments for your server and client, and the ClusterIP services to expose them within the cluster.

Expose Services to External Traffic (Ingress/LoadBalancer):
For external access, you'll typically use an Ingress controller or a LoadBalancer service.

LoadBalancer (simpler for quick setup on cloud providers):
Modify infrastructure/kubernetes/service.yaml for your client service:

# ... for client-service
spec:
  type: LoadBalancer # Change from ClusterIP
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  selector:
    app: realsoccer-client

Then kubectl apply -f infrastructure/kubernetes/service.yaml.

Ingress (recommended for production):
You'll need an Ingress controller running in your cluster (e.g., Nginx Ingress Controller, Traefik).
Create an ingress.yaml file (example):

apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: realsoccer-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /$1
spec:
  rules:
    - host: api.yourdomain.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: realsoccer-server-service
                port:
                  number: 5000
    - host: app.yourdomain.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: realsoccer-client-service
                port:
                  number: 80

Then kubectl apply -f ingress.yaml.

Accessing the Application

If using LoadBalancer, get the external IP: kubectl get services realsoccer-client-service

If using Ingress, configure DNS for api.yourdomain.com and app.yourdomain.com to point to your Ingress controller's external IP.

4. Continuous Deployment (CD)
Integrate your CI/CD pipeline (.github/workflows/ci.yml) to automatically deploy changes to your Kubernetes cluster upon successful builds and tests (e.g., on merge to main branch). This typically involves:

Building and pushing Docker images to a registry.

Updating Kubernetes deployment manifests with new image tags.

Applying the updated manifests to the cluster using kubectl commands or a GitOps tool like Argo CD/Flux.

5. Environment Variables
Ensure all necessary environment variables for both client and server are correctly set in your deployment environment (e.g., Kubernetes Secrets, ConfigMaps, or cloud provider environment settings).

Server: NODE_ENV, PORT, MONGO_URI, JWT_SECRET, JWT_EXPIRES_IN, EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, EMAIL_FROM.

Client: NODE_ENV, REACT_APP_API_URL.

6. Post-Deployment Steps
Database Seeding: Run the seed.js script (e.g., via a Kubernetes Job or manually from a utility container) to populate initial data if needed for a fresh deployment.

Monitoring & Logging: Set up monitoring tools (e.g., Prometheus, Grafana) and centralized logging (e.g., ELK stack) to observe application health and performance.

Backup Strategy: Implement a robust database backup and recovery strategy.

Security Audits: Regularly review security configurations and dependencies.
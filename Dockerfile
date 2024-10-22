# Stage 1: Build the React frontend
FROM --platform=linux/amd64 node:20-alpine as frontend

WORKDIR /app/frontend

# Copy frontend files to the container
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install

# Copy the rest of the frontend files
COPY frontend/ .

# Build the frontend
RUN npm run build

# Stage 2: Build the Node.js backend
FROM --platform=linux/amd64 node:20-alpine as backend

WORKDIR /app/backend

# Copy backend files to the container
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the backend files
COPY backend/ .

# Stage 3: Create the production image
FROM --platform=linux/amd64 node:20-slim

# Set the working directory
WORKDIR /app

# Copy frontend build from the frontend stage
COPY --from=frontend /app/frontend/build /app/frontend/build

# Copy backend from the backend stage
COPY --from=backend /app/backend /app/backend

# Copy package.json and package-lock.json to the /app directory in Stage 3
COPY package.json package-lock.json ./

# Copy .env file to the root directory
COPY .env .

# Install only production dependencies for the backend
RUN cd /app/backend && npm install --only=prod

# Install Python, pip, and additional build dependencies
RUN apt-get update && apt-get install -y python3 python3-pip \
    build-essential libssl-dev libffi-dev python3-dev python3-venv

# Create a virtual environment and use pip within it
ENV VIRTUAL_ENV=venv
RUN python3 -m venv ${VIRTUAL_ENV}
ENV PATH="${VIRTUAL_ENV}/bin:$PATH"

RUN pip install --upgrade pip

# Install Python packages using pip within the virtual environment
RUN pip install pandas python-dotenv pymongo pytz yahooquery

# Expose the desired port (change this to the port your backend listens on)
EXPOSE 3001

# Start the backend server
CMD ["npm", "start"]

# Base image
FROM node:latest AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Build the Vue.js app
RUN npm run build

# Use Nginx image as base image
FROM nginx:latest

# Copy the build output to replace the default Nginx contents
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

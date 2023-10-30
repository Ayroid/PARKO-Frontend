# Use an official Node.js runtime as the base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire React app source code to the container
COPY . .

# Build the React app (you may need to adjust this based on your build setup)
RUN npm run build

# Expose a port, typically 80, that your React app will run on
EXPOSE 80

# Define the command to start your React app
CMD ["npm", "start"]

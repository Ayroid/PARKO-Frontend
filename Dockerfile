# Use an official Node.js runtime as the base image
FROM node:lts

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install npm 10.2.1
RUN npm install -g npm@10.2.1

# Install project dependencies
RUN npm install

# Copy the entire React app source code to the container
COPY . .

# Build the React app (you may need to adjust this based on your build setup)
RUN npm run build

# Expose a port, typically 80, that your React app will run on
EXPOSE 5173

# Define the command to start your React app
CMD ["npm", "run", "dev"]
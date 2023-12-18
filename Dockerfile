# Use Node.js v18.12.1 as base image
FROM node:18.12.1

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY src/package*.json ./

# Install app dependencies
RUN npm i

# Copy the rest of the application code to the working directory
COPY src .

# Expose the port the app runs on
EXPOSE 3003

# Command to start the application
CMD ["node", "app.js"]
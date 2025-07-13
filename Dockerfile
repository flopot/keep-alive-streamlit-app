# Use modern Node.js base image
FROM node:18-slim

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Run the script
CMD ["node", "keep-alive.js"]

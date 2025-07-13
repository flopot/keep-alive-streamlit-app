# Use modern Node.js base image
FROM node:18-slim

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install puppeteer@^22.8.2

# Copy source files
COPY . .

# Run the script
CMD ["node", "keep-alive.js"]

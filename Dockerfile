# Use a lightweight Node.js image
FROM node:18-slim

# Install Chromium and dependencies
RUN apt-get update && \
    apt-get install -y wget gnupg ca-certificates chromium --no-install-recommends && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
    
# Create an application directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Set the entry point (run the Puppeteer script)
CMD ["node", "keep-alive.js"]

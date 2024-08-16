# Use a lightweight Node.js image
FROM node:16-slim

# Install Chromium and dependencies
RUN apt-get update && apt-get install -y \
    chromium \
    --no-install-recommends

# Create an application directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json /app/package.json
RUN npm install

# Copy the rest of the application code
COPY . /app

# Set the entry point (run the Puppeteer script)
CMD ["node", "keep-alive.js"]

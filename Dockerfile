FROM node:18-slim

WORKDIR /app

COPY package*.json ./
RUN npm install puppeteer@^22.8.2

COPY . .

CMD ["node", "keep-alive.js"]

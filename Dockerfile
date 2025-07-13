# Chromium + Puppeteer already pre-installed
FROM ghcr.io/puppeteer/puppeteer:latest

WORKDIR /app

# Only copy the script you need
COPY keep-alive.js .

CMD ["node", "keep-alive.js"]

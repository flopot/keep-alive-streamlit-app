# Image officielle Puppeteer (Chromium + toutes libs déjà installées)
FROM ghcr.io/puppeteer/puppeteer:latest

WORKDIR /app

# Dép-instal : Puppeteer est déjà présent, on n’installe que nos dépendances éventuelles
COPY package*.json ./
RUN npm ci --omit=dev                # rapide, pas de download Chromium

# Code source
COPY . .

CMD ["node", "keep-alive.js"]

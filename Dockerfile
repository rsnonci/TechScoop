# ================================
# 1️⃣ Build React (client)
# ================================
FROM node:18 AS builder

WORKDIR /app
COPY client/ ./client
COPY package*.json ./

RUN npm install

COPY .dockerforcebuild /app/.dockerforcebuild

RUN echo "------ Debug contents of /app ------" && ls -lah /app && \
    echo "------ Debug contents of /app/client ------" && ls -lah /app/client && \
    echo "------ index.html content ------" && cat /app/client/index.html || echo "MISSING"

# ⬇️ Build React app
WORKDIR /app/client
RUN npm run build:client

# ================================
# 2️⃣ Build Express (server)
# ================================
FROM node:18

WORKDIR /app

COPY server ./server
COPY tsconfig.json ./
COPY tailwind.config.ts ./
COPY vite.config.ts ./
COPY drizzle.config.ts ./
COPY package*.json ./

RUN npm install

# ⬇️ Copy built React from builder image
COPY --from=builder /app/client/dist/public ./server/public

# ⬇️ Build backend with tsc
RUN npm run build:server
RUN ls -R dist/server  # debug check

EXPOSE 8080
CMD ["node", "dist/server/index.js"]

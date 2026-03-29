# Build stage
FROM node:22-alpine AS builder
WORKDIR /app
ARG API_URL=http://localhost:5000
ENV API_URL=$API_URL
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:22-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY next.config.ts ./
EXPOSE 3000
CMD ["node_modules/.bin/next", "start"]

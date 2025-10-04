# 1. Use official Node image for building
FROM node:20-alpine AS builder
WORKDIR /app

# 2. Copy package files and install deps
COPY package*.json ./
RUN npm ci

# 3. Copy project files and build
COPY . .
RUN npm run build

# 4. Production image — smaller and optimized
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
# Disable Next telemetry
ENV NEXT_TELEMETRY_DISABLED=1

# 5. Copy only the necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.* ./ || true

# 6. Expose port and run the app
EXPOSE 3000
CMD ["npm", "start"]

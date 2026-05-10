# ─── Stage 1: Install dependencies ───────────────────────────────────────────
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

# ─── Stage 2: Runtime image ───────────────────────────────────────────────────
FROM node:20-alpine AS runtime

# git wajib ada untuk WorktreeManager.js
RUN apk add --no-cache git

# Non-root user untuk keamanan
RUN addgroup -S nexus && adduser -S nexus -G nexus

WORKDIR /app

# Copy hanya production deps dari stage sebelumnya
COPY --from=deps /app/node_modules ./node_modules

# Copy source code engine
COPY --chown=nexus:nexus . .
RUN chmod +x cli.js

# Buat workspace dan sesuaikan permission
RUN mkdir -p /workspace && chown nexus:nexus /workspace

# Switch ke non-root user
USER nexus

ENV NODE_ENV=production
ENV NEXUS_ROOT=/app

# WORKDIR = folder project TALL stack yang akan diaudit
WORKDIR /workspace

# Entrypoint pakai node langsung, lebih stabil dari npm link
ENTRYPOINT ["node", "/app/cli.js"]
CMD ["run"]
# 🤖 Human-AI Nexus: Autonomous Multi-Agent Container
# Version: v3.1.0 (Time-Aware)

FROM node:22-alpine

# Set Timezone to UTC+8 (Asia/Makassar/Singapore)
RUN apk add --no-cache tzdata
ENV TZ=Asia/Makassar

# Create App Directory
WORKDIR /app

# Copy dependency definitions
COPY package*.json ./

# Install dependencies (Clean Install)
RUN npm ci --omit=dev

# Copy project files
COPY . .

# Ensure standard permissions
RUN chmod +x cli.js

# Environment Variables
ENV NEXUS_MODE=autonomous
ENV NEXUS_TZ=UTC+8

# The engine runs as a CLI tool by default
ENTRYPOINT ["node", "cli.js"]
CMD ["run", "--yes"]

# Labels for Metadata
LABEL maintainer="Faisal-Trainer"
LABEL version="3.1.0"
LABEL description="Autonomous Multi-Agent AI Framework"
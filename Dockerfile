# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

COPY . .

# Copy package.json and install dependencies
COPY package.json ./
COPY nest-cli.json ./
COPY tsconfig.base.json ./

# COPY pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

# Copy specific app and libs directories
COPY apps/gateway ./apps/gateway

RUN pnpm install @nestjs/cli

RUN pnpm build gateway
# Expose the port the app runs on
EXPOSE 4003

# Define the command to run the app
CMD ["pnpm", "start:prod:gateway"]


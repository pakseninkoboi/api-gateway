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
COPY apps/users ./apps/users

COPY apps/users/prisma ./prisma
COPY apps/users/prisma/generated ./prisma/generated

RUN pnpm install @nestjs/cli

RUN pnpm install prisma
# Generate Prisma Client
RUN npx prisma generate

# Build the application
RUN pnpm build users

# Expose the port the app runs on
EXPOSE 4001

# Define the command to run the app
CMD ["pnpm", "start:prod:users"]


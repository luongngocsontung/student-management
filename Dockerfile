# Use Node.js base image
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm i

# Generate Prisma Client
COPY prisma ./
RUN npx prisma generate

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE ${APP_PORT}

# Ensure Prisma migration runs before the app starts
CMD ["sh", "-c", "npm run db:deploy && echo 'DB Deployed' && npm run start:dev"]
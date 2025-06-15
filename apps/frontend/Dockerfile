# ---- Stage 1: Build ----
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency-related files
COPY package.json package-lock.json ./
COPY nx.json .
COPY tsconfig.base.json .
COPY tsconfig.json .
COPY eslint.config.mjs .
# Copy the frontend app and any shared libraries
COPY apps/frontend ./apps/frontend

# Install dependencies
RUN npm install

# Build the frontend app using Nx
# RUN npx nx build frontend
RUN npx nx sync && npx nx build frontend

# ---- Stage 2: Serve with a lightweight web server ----
FROM node:20-alpine

WORKDIR /app

# Install serve globally to serve the built static files
RUN npm install -g serve

# Copy the build output from the previous stage
COPY --from=builder /app/apps/frontend/dist ./dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]

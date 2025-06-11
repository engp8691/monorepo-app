FROM node:lts-alpine

ENV HOST=0.0.0.0
ENV PORT=3000

WORKDIR /app

RUN addgroup --system backend && \
  adduser --system -G backend backend

# Copy backend build output from monorepo subfolder
COPY apps/backend/dist backend/

# Copy backend package.json from monorepo subfolder
COPY package*.json ./

# Install production dependencies
RUN npm install --omit=dev

RUN chown -R backend:backend .

USER backend

CMD ["node", "backend/main.js"]

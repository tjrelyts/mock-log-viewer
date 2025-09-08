# Build stage
FROM node:20 AS build
WORKDIR /app

# Copy all files
COPY . .
# Copy .env explicitly (in case .dockerignore excludes it)
COPY .env ./
RUN npm install
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80

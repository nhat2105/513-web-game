FROM node:16 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

# Copy the React source code into the container
COPY . .

# Build the app for production
RUN npm run build

# Use Nginx to serve the production build
FROM nginx:alpine

# Copy the build folder to Nginx container
COPY --from=build /app/build /usr/share/nginx/html

# Expose Nginx port
EXPOSE 80

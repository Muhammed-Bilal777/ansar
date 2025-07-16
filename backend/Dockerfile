# Use Node.js official image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy remaining source files
COPY . .

 
# Build TypeScript
RUN npm run build

# Expose port
EXPOSE 4000

# Start the server
CMD ["node", "dist/index.js"]



# Dockerfile

# 1. Base image
FROM node:18-alpine

# 2. Set working directory
WORKDIR /app

# 3. Copy dependencies
COPY package*.json ./

# 4. Install deps
RUN npm install

# 5. Copy everything else
COPY . .

# 6. Build the app
RUN npm run build

# 7. Expose port and start
EXPOSE 3000
CMD ["npm", "run", "start"]

FROM node:24-alpine

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files
COPY package*.json ./

# Install dependencies
RUN pnpm install

# Copy source code
COPY . .

# Expose port
EXPOSE 5173

# Start the development server
CMD ["pnpm", "run", "dev", "--host", "0.0.0.0"]
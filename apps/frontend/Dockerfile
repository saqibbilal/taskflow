# 1. BASE IMAGE: Node 20 on Alpine Linux
FROM node:20-alpine
LABEL authors="Muhammad Saqib Bilal"

# 2. INSTALL PNPM: It's not in the base image by default
RUN npm install -g pnpm

# 3. WORKDIR: Set the workspace
WORKDIR /app

# 4. COPY LOCKFILES: We copy these first to take advantage of Docker caching
# Since your lockfile is in the ROOT, we have to be careful here.
# For this simple cycle, we will copy the whole frontend folder.
COPY . .

# 5. INSTALL: Install dependencies
RUN pnpm install

# 6. BUILD: Create the production version of the app
RUN pnpm build

# 7. EXPOSE: Tell Docker which port the app runs on (Next.js default is 3000)
EXPOSE 3000

# 8. START: Run the production server
CMD ["pnpm", "start"]
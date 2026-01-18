FROM node:20-slim AS base
RUN corepack enable
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

FROM base AS deps
WORKDIR /app
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/frontend/package.json ./apps/frontend/
RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app

# 1. Define that we expect this argument
ARG NEXT_PUBLIC_API_URL
# 2. Set it as an environment variable so Next.js sees it during 'pnpm build'
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/frontend/node_modules ./apps/frontend/node_modules
COPY . .
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
RUN pnpm --filter frontend build

# Stage 4: Runner
FROM node:20-slim AS runner
WORKDIR /app

# Essential for AWS Health Checks
ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000

# Copy the INSIDE of the standalone folder to /app
COPY --from=builder /app/apps/frontend/.next/standalone ./

# Copy static assets to the nested location pnpm expects
COPY --from=builder /app/apps/frontend/.next/static ./apps/frontend/.next/static
COPY --from=builder /app/apps/frontend/public ./apps/frontend/public

EXPOSE 3000

# THE FIX: Based on your 'ls -R' output, server.js lives here:
CMD ["node", "apps/frontend/server.js"]
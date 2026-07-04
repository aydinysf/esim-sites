FROM node:20-alpine AS builder

RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

# Monorepo root + packages
COPY package.json turbo.json ./
COPY packages/db/package.json ./packages/db/
COPY packages/db/prisma ./packages/db/prisma
COPY packages/db/src ./packages/db/src

# sites/germany app
COPY sites/germany/package.json ./sites/germany/
COPY sites/germany/next.config.mjs sites/germany/tsconfig.json sites/germany/tailwind.config.ts ./sites/germany/
COPY sites/germany/src ./sites/germany/src
COPY sites/germany/public ./sites/germany/public

# Dependencies
RUN npm install

# Prisma client
RUN npx prisma generate --schema=packages/db/prisma/schema.prisma

WORKDIR /app/sites/germany

# Build
RUN npm run build 2>&1 | head -100

# Runtime stage
FROM node:20-alpine

RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

# Production node_modules
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/sites/germany ./sites/germany

WORKDIR /app/sites/germany

ENV NODE_ENV=production

EXPOSE 3000

# Start app directly
CMD ["npm", "start"]

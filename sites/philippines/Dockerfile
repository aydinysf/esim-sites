FROM node:20-alpine AS builder
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

COPY package.json turbo.json package-lock.json ./
COPY packages/db ./packages/db
COPY config ./config
COPY sites/philippines ./sites/philippines

RUN npm install --no-audit --no-fund --include=dev && npm cache clean --force
RUN npx prisma generate --schema=packages/db/prisma/schema.prisma

ARG DATABASE_URL
ARG PUBLIC_COUNTRY_CODE
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_POLOSIM_BUY_URL
ARG SITE_LANG

ENV DATABASE_URL=$DATABASE_URL
ENV PUBLIC_COUNTRY_CODE=$PUBLIC_COUNTRY_CODE
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_POLOSIM_BUY_URL=$NEXT_PUBLIC_POLOSIM_BUY_URL
ENV SITE_LANG=$SITE_LANG

RUN npx turbo run build --filter=@esim/philippines

FROM node:20-alpine AS runner
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

COPY --from=builder /app/sites/philippines/public ./sites/philippines/public
COPY --from=builder /app/sites/philippines/.next/standalone ./
COPY --from=builder /app/sites/philippines/.next/static ./sites/philippines/.next/static

EXPOSE 3000
CMD ["node", "sites/philippines/server.js"]

FROM node:20-alpine AS builder
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

COPY package.json turbo.json package-lock.json ./
COPY packages/db ./packages/db
COPY config ./config
COPY sites/spain ./sites/spain

RUN npm install && npm cache clean --force
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

RUN npx turbo run build --filter=@esim/spain

FROM node:20-alpine AS runner
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/package.json /app/turbo.json /app/package-lock.json ./
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/config ./config
COPY --from=builder /app/sites/spain ./sites/spain
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["npx", "turbo", "run", "start", "--filter=@esim/spain"]

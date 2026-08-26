FROM node:20-alpine
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

COPY package.json turbo.json package-lock.json ./
COPY packages/db ./packages/db
COPY config ./config
COPY sites/romania ./sites/romania

RUN npm install
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

RUN npx turbo run build --filter=@esim/romania

EXPOSE 3000
CMD ["npx", "turbo", "run", "start", "--filter=@esim/romania"]

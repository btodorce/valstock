FROM node:16-alpine AS deps

RUN apk add --no-cache libc6-compat

ENV HUSKY_SKIP_INSTALL=1
ENV HUSKY=0

WORKDIR /app
ENV NODE_ENV production
COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile

FROM node:16-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn next build

FROM node:16-alpine AS runner
RUN apk add --no-cache bash
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

ENV PORT 3000
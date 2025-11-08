# syntax=docker/dockerfile:1.6

FROM node:20-alpine AS base
WORKDIR /app
ARG PNPM_VERSION=8.15.1
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate
RUN apk add --no-cache libc6-compat openssl
ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_API_URL
ARG ORVAL_API_URL
ARG NEXT_PUBLIC_USE_PROXY
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL} \
    ORVAL_API_URL=${ORVAL_API_URL} \
    NEXT_PUBLIC_USE_PROXY=${NEXT_PUBLIC_USE_PROXY}

RUN pnpm build

RUN test -f .next/standalone/server.js || (echo \
  '\n[ERROR] Standalone NIE wygenerowany!\n' \
  'Sprawdź:\n - next.config.ts: output: "standalone"\n - log z pnpm build (czy zakończony sukcesem)\n' \
  'Zawartość .next:\n' && ls -la .next && exit 1)

FROM node:20-alpine AS runner
WORKDIR /app
RUN apk add --no-cache libc6-compat openssl
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=4020

COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

EXPOSE 4020
CMD ["node",".next/standalone/server.js"]

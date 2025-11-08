# syntax=docker/dockerfile:1.6

########## BASE ##########
FROM node:20-alpine AS base
WORKDIR /app
ARG PNPM_VERSION=8.15.1
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate
RUN apk add --no-cache libc6-compat openssl
ENV NEXT_TELEMETRY_DISABLED=1

########## DEPS ##########
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

########## BUILD ##########
FROM base AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# build-argi (jeśli wstrzykujesz z CI)
ARG NEXT_PUBLIC_API_URL
ARG ORVAL_API_URL
ARG NEXT_PUBLIC_USE_PROXY
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL} \
    ORVAL_API_URL=${ORVAL_API_URL} \
    NEXT_PUBLIC_USE_PROXY=${NEXT_PUBLIC_USE_PROXY}

RUN pnpm build

# Podgląd co wygenerował Next (pomocne w debug)
RUN echo "\n=== BUILD ARTIFACTS ===" \
 && ls -la /app \
 && echo "\n=== .next ===" \
 && ls -la /app/.next || true \
 && echo "\n=== .next/standalone ===" \
 && ls -la /app/.next/standalone || true

########## RUNNER ##########
FROM node:20-alpine AS runner
WORKDIR /app
RUN apk add --no-cache libc6-compat openssl
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=4020

# kopiujemy pełny runtime zestaw (działa dla obu wariantów)
COPY --from=build /app/server.js ./server.js
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

EXPOSE 4020

# Fallback: standalone → server.js → next start
CMD ["/bin/sh","-lc", "\
  if [ -f .next/standalone/server.js ]; then \
    echo 'Starting Next (standalone)…' && node .next/standalone/server.js; \
  elif [ -f server.js ]; then \
    echo 'Starting Next (server.js)…' && node server.js; \
  else \
    echo 'Starting Next (next start)…' && pnpm start; \
  fi \
"]

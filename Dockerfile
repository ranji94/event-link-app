# syntax=docker/dockerfile:1.6
FROM node:22-alpine AS base
WORKDIR /app

# pnpm jak w Twoim Nest.js
ARG PNPM_VERSION=8.15.1
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

# często potrzebne (np. sharp)
RUN apk add --no-cache libc6-compat openssl
ENV NEXT_TELEMETRY_DISABLED=1

# ---------- deps ----------
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
# Jeśli używasz np. prisma/itp. i potrzebne do instalacji zależności:
# COPY prisma ./prisma
RUN pnpm install --frozen-lockfile

# ---------- dev ----------
FROM base AS dev
ENV NODE_ENV=development
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 4020
CMD ["pnpm", "dev", "-p", "4020", "-H", "0.0.0.0"]

# ---------- build (PROD) ----------
FROM base AS build
ENV NODE_ENV=production
# NEXT_PUBLIC_* musi być ustawione PRZED buildem (kompilacja do bundla)
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

ARG ORVAL_API_URL
ENV ORVAL_API_URL=${ORVAL_API_URL}

ARG NEXT_PUBLIC_USE_PROXY
ENV NEXT_PUBLIC_USE_PROXY=${NEXT_PUBLIC_USE_PROXY}

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build \
 && pnpm prune --prod

# ---------- runner (PROD) ----------
FROM node:22-alpine AS runner
WORKDIR /app
RUN apk add --no-cache libc6-compat openssl
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=4020

# Pliki runtime
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules
COPY package.json pnpm-lock.yaml ./

EXPOSE 4020
CMD ["node", "node_modules/.bin/next", "start", "-p", "4020", "-H", "0.0.0.0"]

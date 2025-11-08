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
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# (opcjonalnie) build-argi z Jenkinsa
ARG NEXT_PUBLIC_API_URL
ARG ORVAL_API_URL
ARG NEXT_PUBLIC_USE_PROXY
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL} \
    ORVAL_API_URL=${ORVAL_API_URL} \
    NEXT_PUBLIC_USE_PROXY=${NEXT_PUBLIC_USE_PROXY}
RUN pnpm build

########## RUNNER ##########
FROM node:20-alpine AS runner
WORKDIR /app
RUN apk add --no-cache libc6-compat openssl
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=4020

# standalone potrzebuje tylko tych folderów
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

EXPOSE 4020
# ⬇️ uruchamiamy serwer Next bez .bin — czysty Node
CMD ["node",".next/standalone/server.js"]

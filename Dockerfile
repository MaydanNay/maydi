# Multi-stage: build maydi + maydi_studio, serve via nginx
FROM node:22-bookworm-slim AS build

WORKDIR /app

# Root site deps
COPY package.json package-lock.json ./
RUN npm ci

# Studio deps
COPY maydi_studio/package.json maydi_studio/package-lock.json ./maydi_studio/
RUN npm --prefix maydi_studio ci

# Sources (see .dockerignore)
COPY . .

# Empty VITE_API_URL → same-origin /api via nginx in production
ENV VITE_API_URL=

RUN npm run build:all \
  && test -f dist/index.html \
  && test -f dist/studio/index.html \
  && test -d dist/studio/assets

# ── runtime (nginx + brotli) ─────────────────────────────────────────────────
FROM fholzer/nginx-brotli:v1.31.3

RUN apk add --no-cache wget

COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

# Fail image build if SPA shells missing
RUN test -f /usr/share/nginx/html/index.html \
  && test -f /usr/share/nginx/html/studio/index.html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -q --spider http://127.0.0.1/ || exit 1

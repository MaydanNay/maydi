# Docker (maydi + studio + API)

## Prep

1. Backend env (**required** — compose fails without this file):

```bash
cp maydi_studio/backend-roaster/.env.example maydi_studio/backend-roaster/.env
```

Set at least:
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET` (long random)
- `SECURE_COOKIES=false` for local http; `true` on HTTPS maydi.net
- `OPENAI_API_KEY` (optional — admin/projects work without it)
- `APP_ENV=production`

2. Optional root compose env:

```bash
cp .env.example .env
# WEB_PORT, CORS_ORIGINS, SECURE_COOKIES
```

## Run

```bash
docker compose up --build -d
```

Open:
- http://localhost:8080/ — company site
- http://localhost:8080/studio/ — studio
- http://localhost:8080/studio/admin — admin (SQLite volume `api_data`)

Logs: `docker compose logs -f`  
Stop: `docker compose down` (keeps DB)  
Wipe DB: `docker compose down -v`

## Layout

| Service | Role |
|---------|------|
| `web` | nginx — `/`, `/studio/`, proxies `/api/` → api |
| `api` | FastAPI — projects, leads, media, roast |

Data: Docker volume `api_data` → `/app/data` (`maydi.db`, `uploads/`).

## Prod checklist

- TLS terminator in front (Caddy/Cloudflare/nginx)
- `SECURE_COOKIES=true`
- `CORS_ORIGINS=https://maydi.net`
- Strong `ADMIN_PASSWORD` + `ADMIN_SESSION_SECRET`
- Back up volume `api_data`

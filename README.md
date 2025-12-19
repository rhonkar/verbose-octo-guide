# rest-service

Small Node.js REST service exposing two endpoints and configured entirely via environment variables.

Endpoints
- `GET /health` — returns HTTP 200 and JSON: `{ "message": "OK" }`.
- `GET /api/v1/info` — returns JSON with `timestamp`, `hostname`, and `info` (from `INFO_MESSAGE`, default "Hello World").

Configuration (env vars)
- `PORT` — port to listen on (default `3000`).
- `INFO_MESSAGE` — content for the `info` field (default `Hello World`).
- `NODE_ENV` — node environment (default `production`).

Run locally (requires Node.js >=22)

```bash
npm install
PORT=3000 INFO_MESSAGE="Hello World" npm start
```

Run with Docker Compose

```bash
docker compose build
docker compose up -d
```

You can override environment variables when running compose, for example:

```bash
INFO_MESSAGE="Custom message" PORT=4000 docker compose up --build
```

Notes / Best practices implemented
- Configuration entirely via environment variables.
- Runs as a non-root user inside the container.
- Minimal dependencies and a small base image (`node:22-alpine`).
- Healthcheck present in the image and compose to ensure container readiness.
- Graceful shutdown on `SIGINT`/`SIGTERM`.

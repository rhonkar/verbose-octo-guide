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
Build and Push to registry

```bash
docker compose build
docker image push localhost:32000/rest-service:1.0
```

Deploy in K8S

```bash
kubectl apply -f k8s/
```

Or apply them individually

```bash
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/ingress.yaml
```

Access in web browser

1. In WSL run hostname -I to get WSL IP (something like 172.x.x.x)
2. Add WSL IP to local host table: 172.x.x.x rest-service.net
3. Open

```bash
    https://rest-service.net/health/
    https://rest-service.net/api/v1/info/
```

Notes / Best practices implemented
- Configuration entirely via environment variables.
- Runs as a non-root user inside the container.
- Minimal dependencies and a small base image (`node:22-alpine`).
- Healthcheck present in the image and compose to ensure container readiness.
- Graceful shutdown on `SIGINT`/`SIGTERM`.

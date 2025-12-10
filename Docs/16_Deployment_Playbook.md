# Deployment Playbook

## 1. Pre-Flight Checklist
-   [ ] Git branch is `main`.
-   [ ] CI/CD pipeline passed.
-   [ ] `requirements.txt` is pinned.
-   [ ] Environment variables set in Production Secrets Manager.

## 2. Deployment Steps (Docker Compose / Swarm)

1.  **SSH into Server**:
    ```bash
    ssh user@production-server
    ```
2.  **Pull Latest Images**:
    ```bash
    docker-compose pull
    ```
3.  **Run DB Migrations**:
    ```bash
    docker-compose run --rm api alembic upgrade head
    ```
4.  **Rolling Restart**:
    ```bash
    docker-compose up -d --build
    ```
5.  **Verify Health**:
    ```bash
    curl http://localhost:8000/health
    # Expect {"status": "ok"}
    ```

## 3. Rollback Procedure
If the API returns 500s or fails health checks:
1.  **Revert Image**:
    Edit `.env` or `docker-compose.yml` to point to previous tag `v1.0.0`.
2.  **Redeploy**:
    ```bash
    docker-compose up -d
    ```
3.  **Downgrade DB** (Only if schema broke):
    ```bash
    docker-compose run --rm api alembic downgrade -1
    ```

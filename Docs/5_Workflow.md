# Development Workflow

## 1. Branching Strategy (GitFlow)

```mermaid
gitGraph
    commit
    branch develop
    checkout develop
    commit
    branch feature/auth
    checkout feature/auth
    commit
    commit
    checkout develop
    merge feature/auth
    branch feature/ai-agent
    checkout feature/ai-agent
    commit
    checkout develop
    merge feature/ai-agent
    checkout main
    merge develop tag: "v1.0.0"
```

1.  **main**: Production-ready. Deployable.
2.  **develop**: Staging. All features merge here first.
3.  **feature/name**: Individual tasks.

## 2. CI/CD Pipeline Visualization

```mermaid
graph LR
    Push[Git Push] --> Test[Run Tests]
    Test --> Lint[Lint Check]
    Lint --> Build[Build Docker]
    Build --> Deploy[Deploy Staging]
```

## 3. Tooling Configuration

### 3.1. Pre-Commit Hooks
Configure `.pre-commit-config.yaml` to run:
-   `black` (Python formatting)
-   `ruff` (Python linting)
-   `prettier` (JS/TS formatting)

### 3.2. Code Review Checklist
-   [ ] Are Pydantic models strict?
-   [ ] Are async functions awaited?
-   [ ] Are database sessions closed/yielded correctly?
-   [ ] Does the PR include a migration file if models changed?

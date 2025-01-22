# SupraSupport API

Backend API service for the SupraSupport customer service system.

## Features

- Multiple specialized AI agents (Customer Service, Billing, Orders, Technical Support)
- WebSocket support for real-time chat
- Context-aware conversation handling
- Agent transfer capabilities
- Mock client for testing without API keys

## Development

```bash
# Install dependencies
poetry install

# Run development server
poetry run uvicorn app.main:app --reload

# Run tests
poetry run pytest
```

## Deployment

This service is deployed on Fly.io for:
- Native WebSocket support
- Persistent service hosting
- Built-in logging capabilities

The deployment is automated through GitHub Actions workflows.

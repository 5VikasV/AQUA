# AQUA AI Context

## Project

AQUA is a modular personal AI operating system.

It is not a chatbot.

The long-term goal is an AI desktop assistant capable of:

- Conversation
- Long-term memory
- Multiple chat sessions
- Tools
- Local file access
- Voice
- Automation
- Plugins
- RAG
- Desktop integration

---

## Tech Stack

Backend

- FastAPI
- SQLAlchemy
- SQLite
- Python

Frontend

- React
- TypeScript
- Vite
- Tailwind CSS

---

## Architecture

backend/
    api/
    agent/
    database/
    memory/
    providers/
    schemas/
    services/

frontend/
    features/
    pages/
    lib/

---

## Current Sprint

Sprint 5

Current feature:

Conversation Sessions

Completed:

- Chat API
- Memory
- Session API
- Sidebar UI
- React chat interface

Currently implementing:

- Full multi-chat support
- Session switching
- Conversation loading

---

## Coding Standards

Frontend

- Feature-based architecture.
- Shared API client in `frontend/src/lib/api.ts`.
- Use TypeScript type-only imports where required.
- Keep components focused and reusable.

Backend

- Thin FastAPI routes.
- Business logic belongs in services.
- SQLAlchemy models live in `database/`.
- Pydantic schemas live in `schemas/`.

---

## Git Workflow

Every completed feature should follow:

1. Implement
2. Review
3. Test
4. Commit

Never leave the project in a broken state before committing.

---

## Assistant Behavior

Before making code changes:

- Understand the existing implementation.
- Reuse existing code whenever possible.
- Explain the implementation plan briefly.
- Then edit the minimum number of files necessary.
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Frontend (root directory)
```bash
npm run dev       # Start Vite dev server (http://localhost:5173)
npm run build     # Production build
npm run lint      # ESLint
npm run preview   # Preview production build
```

### Backend (server/ directory)
```bash
cd server
npm install       # Install backend deps separately
npm run dev       # Start with nodemon (auto-reload)
npm start         # Start without auto-reload
```

## Architecture

This is a full-stack app with two separate Node projects:

- **Root** — React 19 + Vite frontend (ES modules, `"type": "module"`)
- **`server/`** — Express backend (CommonJS, no `"type": "module"`)

These are independent `package.json`s — `npm install` at the root does NOT install backend deps.

### Data Flow

1. **Question generation** (`src/llmService.js`) — Contains a large hardcoded question bank organized by `category → difficulty → questions[]`. At runtime it either uses these mock questions or calls a local LLM (Ollama at `:11434` or LM Studio at `:1234`) via the Vite proxy. Provider/model are selectable in the UI.

2. **Quiz state** (`src/App.jsx`) — Single-component app managing all game state (setup → playing → results screens).

3. **Performance persistence** (`server/routes/performance.js` → MariaDB) — After completing a quiz, results POST to `/api/performance/session`, which writes to three MySQL tables: `quiz_sessions`, `question_results`, and `category_performance` (upserted aggregate).

### Vite Proxy (vite.config.js)
The dev server proxies three paths to avoid CORS:
- `/api/lmstudio/*` → `http://localhost:1234`
- `/api/ollama/*` → `http://localhost:11434`
- `/api/performance/*` → `http://localhost:3001`

### Database
MariaDB/MySQL on a Raspberry Pi. Schema in `database/schema.sql`. Configure via `server/.env` (copy from `server/.env.example`). The app works without the backend — it falls back gracefully when the API server is unreachable.

### LLM Configuration
Override defaults via root `.env`:
```
VITE_LLM_API_URL=http://localhost:11434/v1/chat/completions
VITE_LLM_MODEL=llama3
```

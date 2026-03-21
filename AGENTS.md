# AGENTS.md

## Project scope
- `CodeTrivia` is a React + Vite frontend (`src/`) with an optional Express + MySQL backend (`server/`) for performance tracking.
- Core game loop lives in `src/App.jsx` (`setup -> loading -> quiz -> results`) and calls services, not backend APIs directly.

## Architecture map (what talks to what)
- UI layer: `src/App.jsx` and `src/Stats.jsx`.
- Question generation layer: `src/llmService.js` (`generateQuestions`, provider/model discovery).
- Performance data layer: `src/performanceService.js` (all `/api/performance/*` calls, `DEFAULT_USER_ID = 1`).
- Backend API: `server/server.js` mounts `server/routes/performance.js` under `/api/performance`.
- Data store: MySQL schema in `database/schema.sql`; pooled DB access via `server/db.js`.
- Dev proxy boundary: `vite.config.js` proxies `/api/lmstudio`, `/api/ollama`, `/api/performance` to ports `1234`, `11434`, `3001`.

## Runtime and developer workflows
- Frontend install/run/build/lint from repo root (`package.json`): `npm install`, `npm run dev`, `npm run build`, `npm run lint`.
- Backend install/run from `server/` (`server/package.json`): `npm install`, `npm run dev` (nodemon), `npm start`.
- No automated test scripts are defined in either package manifest; rely on lint + manual flows.
- Health check endpoint: `GET http://localhost:3001/health` (`server/server.js`).

## Data flow details agents should preserve
- Starting a quiz calls `generateQuestions(...)` in `src/llmService.js`; provider `mock` bypasses network and uses local library questions.
- Non-mock providers build an LLM prompt and may append personalization from `getPersonalizationContext()` (lazy import from `src/performanceService.js`).
- Save flow is user-driven in results screen (`src/App.jsx`): `saveQuizSession()` runs only after explicit save click.
- Stats modal (`src/Stats.jsx`) loads `getDetailedStats()` + `getPerformanceSummary()` in parallel.
- Backend `POST /session` writes `quiz_sessions`, bulk inserts `question_results`, then upserts `category_performance` in one transaction (`server/routes/performance.js`).

## Conventions and patterns specific to this repo
- Frontend uses functional components + hooks; no global state library.
- Error strategy differs by call type in `src/performanceService.js`:
  - `saveQuizSession` and `getWeakAreas` swallow errors and return `{ success: false }` / `[]`.
  - `getPerformanceSummary` and `getDetailedStats` throw on non-OK responses.
- Keep category/difficulty/question-count constants aligned with UI selectors in `src/App.jsx` (`CATEGORIES`, `DIFFICULTIES`, `QUESTION_COUNTS` from `src/llmService.js`).
- LLM responses are defensive-parsed in `generateQuestions` (strip code fences, remove `<think>`, parse JSON, normalize + dedupe, then fallback to library questions).

## Integration and env assumptions
- Frontend env: `VITE_API_URL`, `VITE_LLM_API_URL`, `VITE_LLM_MODEL` (see `README.md`, `src/performanceService.js`, `src/llmService.js`).
- Backend env: `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `PORT`, `NODE_ENV` (`server/.env.example`, `server/db.js`, `server/server.js`).
- Rate limiting is enabled only on `/api/performance` routes (`express-rate-limit` in `server/server.js`).
- Database schema currently seeds a single `default_user`; frontend assumes user id `1` until auth exists.


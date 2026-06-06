# Product Store Workspace

This repository has two main parts:
- `backend/`: Express API server using ES modules, Neon Postgres, and Arcjet request protection.
- `frontend/`: Next.js 16 app router frontend using React 19, Tailwind CSS 4, DaisyUI, and `@/*` path alias for `./src/*`.

## Important facts

- Backend uses `type: module` and modern ES imports.
- The backend server runs from `backend/server.js` and exposes REST routes under `/api/products`.
- `backend/lib/arcjet.js` applies bot, rate-limit, and shield protections to all incoming requests.
- Database connection uses Neon (`@neondatabase/serverless`) with environment variables loaded from `.env` in the root workspace.
- Frontend uses `frontend/src/app` and the app router. Do not assume the legacy `pages/` router is active here.
- `frontend/src/pages/` contains local React components, not Next.js route definitions.

## Developer commands

- Root backend install: `npm install`
- Start backend: `npm run dev`
- Frontend install: `cd frontend && npm install`
- Start frontend: `cd frontend && npm run dev -- --port 3001`
  - Use a different port for the frontend to avoid conflict with the backend default port `3000`.

## Agent-specific guidance

- Prefer workspace-wide knowledge from this file for cross-cutting changes.
- For frontend-only code, also check `frontend/AGENTS.md` because it contains Next.js-specific guidance.
- Keep backend and frontend logic separate: `backend/` is the API service, `frontend/` is the UI app.
- Avoid assuming data-fetching or routing patterns from older Next.js versions.
- Preserve the existing `frontend/AGENTS.md` content when working on frontend-specific instructions.

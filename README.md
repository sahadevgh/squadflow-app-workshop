# SquadFlow Systems Workshop

SquadFlow is a workshop-friendly full-stack demo app for teaching how a frontend, backend, and persistence layer work together. It includes a Next.js client, an Express server, and a file-based JSON database that are intentionally easy to inspect during a live walkthrough.

## Purpose

This project is useful for demonstrating:
- frontend to backend communication over HTTP
- REST-style API design
- server-side business logic and validation
- persistence to a simple database layer
- how broken data can affect multiple layers of an app

## Current Architecture

```text
Browser UI
  -> Next.js pages/components in client/
  -> client-side API helpers in client/lib/api-client.ts
  -> Next.js route handlers in client/app/api/*
  -> Express API in server/src/routes.ts
  -> file-backed data layer in server/src/db.ts
  -> JSON database in database/data.json
```

## Project Structure

```text
.
├── client/                  # Next.js frontend and proxy API routes
│   ├── app/                 # App Router pages and route handlers
│   ├── components/          # UI components
│   ├── lib/                 # API client utilities
│   └── package.json
├── server/                  # Express backend
│   ├── src/
│   │   ├── index.ts         # Express app entry
│   │   ├── routes.ts        # API endpoints
│   │   ├── db.ts            # File-backed data access
│   │   └── seed.ts          # Seed data generator
│   ├── package.json
│   └── tsconfig.json
├── database/
│   └── data.json            # JSON persistence layer
└── README.md
```

## Runtime Ports

- Client: `http://localhost:3000`
- Server: `http://localhost:8000`

The client’s `/api/*` routes act as a proxy to the Express backend, which keeps the frontend code calling relative URLs while still preserving a clean separation between layers.

## Key Pages

- `/` : marketing/landing page
- `/dashboard` : admin dashboard and learner dashboard entry
- `/tasks` : task list for admin users
- `/tasks/new` : create task form
- `/tasks/[id]` : edit task form
- `/learners` : learner progress overview and add-learner dialog
- `/system-map` : architecture explainer for workshop demos

## API Surface

### Client-side proxy routes

These live under `client/app/api/*` and forward requests to the Express backend.

- `GET /api/tasks`
- `POST /api/tasks`
- `GET /api/tasks/:id`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`
- `GET /api/learners`
- `POST /api/learners`
- `GET /api/learners/:id`
- `GET /api/learners/:id/progress`
- `GET /api/dashboard/summary`

### Express backend routes

These live in `server/src/routes.ts` and are served from `http://localhost:8000/api`.

- `GET /api/tasks`
- `POST /api/tasks`
- `GET /api/tasks/:id`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`
- `GET /api/learners`
- `POST /api/learners`
- `GET /api/learners/:id`
- `GET /api/learners/:id/progress`
- `GET /api/dashboard/summary`

## How Data Works

- The server reads and writes `database/data.json`
- If the database file is missing, the server seeds it from `server/src/seed.ts`
- The JSON file is intentionally human-readable so workshop participants can inspect it directly

Current note:
- The app now includes defensive guards for malformed records, because this repo was used to surface how bad data can break UI and server assumptions

## Setup

### Prerequisites

- Node.js 18+
- npm

### Install dependencies

```bash
cd client && npm install
cd ../server && npm install
```

## Run Locally

Start the backend first:

```bash
cd server
npm run dev
```

Expected log:

```text
Express server is running on http://localhost:8000
API endpoints available at http://localhost:8000/api/*
Using existing database at .../database/data.json
```

Then start the frontend:

```bash
cd client
npm run dev
```

Open:

- `http://localhost:3000`

## Useful Checks

Verify the backend directly:

```bash
curl http://localhost:8000/health
curl http://localhost:8000/api/tasks
curl http://localhost:8000/api/learners
```

Verify the client proxy layer:

```bash
curl http://localhost:3000/api/tasks
curl http://localhost:3000/api/dashboard/summary
```

## Build Commands

Backend:

```bash
cd server
npm run build
```

Frontend:

```bash
cd client
npm run build
```

## Workshop Talking Points

- Why the client calls its own `/api/*` routes instead of calling Express directly
- Why the backend owns validation and persistence
- Why the database is separated into its own folder for architectural clarity
- How stale or malformed data can break both UI rendering and server logic
- How route handlers, API clients, and server routes each represent different responsibilities

## Notes

- Learner mode intentionally has restricted navigation compared to admin mode
- The database is file-based on purpose for teaching, not for production use
- The current default backend port is `8000` to avoid conflicts on machines where `5000` is already occupied

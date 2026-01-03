# Anonymous Feedback Portal

This repository contains a simple anonymous feedback portal with a frontend (in `feedback portal/`) and an Express-based backend (this folder).

## Overview
- Frontend: React + Vite + Tailwind located in `feedback portal/`.
- Backend: Node.js / Express located in this folder (`server/`).
- Purpose: collect anonymous student feedback, store it, and provide basic endpoints to manage feedback and students.

## Repo structure (relevant parts)
- `feedback portal/` — frontend source (Vite, src/, components/)
- `server/` — backend API
  - `index.js` — server entrypoint
  - `models/Feedback.js`, `models/Student.js` — Mongoose models
  - `.env` — environment variables (not committed)
  - `uploads/` — file upload storage

## Prerequisites
- Node.js (16+ recommended)
- npm or yarn
- MongoDB (local or Atlas) if the backend uses Mongoose

## Backend: setup & run
1. Open a terminal in the `server` folder:

```bash
cd server
npm install
```

2. Create a `.env` file (there is a sample `.env` in the folder). Typical variables:

- `PORT` — server port (e.g. `5000`)
- `MONGODB_URI` or `DATABASE_URL` — connection string for MongoDB
- Any other secrets used by `index.js`

3. Start the server:

```bash
# dev
node index.js
# or if package.json defines a start script
npm start
```

The server will listen on the configured `PORT` and use the `uploads/` folder for any file uploads.

## Frontend: setup & run (feedback portal)
1. Open a terminal in the `feedback portal` folder:

```bash
cd "feedback portal"
npm install
npm run dev
```

2. The Vite dev server will typically run on `http://localhost:5173` (or another port shown in the terminal).

## API (expected endpoints)
The backend includes models for `Feedback` and `Student`. Typical endpoints you can expect or add:

- `GET /api/feedback` — list feedback
- `POST /api/feedback` — submit new feedback
- `GET /api/students` — list students
- `POST /api/students` — add a student
- `POST /api/upload` — upload files (if implemented)

Check `index.js` for the exact routes and middleware.

## Notes
- The `uploads/` folder is present for storing uploaded files; ensure it exists and is writable.
- Keep secrets out of source control; add `.env` to `.gitignore` (already present).

## Contributing
- Make a branch, add tests where appropriate, and open a PR.

## License
- Add a license file or choose a license (MIT is commonly used).

If you want, I can also create a README for the `feedback portal/` frontend or update the root README. Let me know which you'd prefer next.

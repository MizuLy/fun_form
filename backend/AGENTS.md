# Repository Guidelines

## Project Structure

This directory contains the Express and Prisma API. `src/server.js` configures middleware and mounts routes. Endpoint mappings are in `src/routes/`, request and database logic is in `src/controllers/`, Prisma connection helpers are in `src/config/`, and code generators are in `src/utils/`. PostgreSQL models live in `prisma/schema.prisma`; migration history is under `prisma/migrations/`.

## Development Commands

- `npm install` - install dependencies from `package-lock.json`.
- `npm run dev` - run the API with Nodemon on port `6969` by default.
- `npm.cmd exec -- prisma generate` - regenerate the Prisma client.
- `npm.cmd exec -- prisma validate` - validate the schema without changing the database.
- `npm.cmd exec -- prisma migrate dev` - create or apply a development migration.

Set `DATABASE_URL` in a local `.env` file. Never commit credentials or `.env` files. PowerShell may block `npx.ps1`; use the `npm.cmd exec -- prisma ...` form when needed.

## API and Data Conventions

The API uses JSON and CommonJS modules. Current resources are available at `/api/permissions`, `/api/certificates`, and `/api/invitations`. Invitation requests send `date` as `YYYY-MM-DD` and `time` as `HH:mm`; the controller combines them into the existing Prisma `DateTime` field and rejects dates before today.

Use four-space indentation, semicolons, double-quoted strings, `camelCase` functions and variables, and `PascalCase` Prisma models. Keep routes thin and put business logic in controllers or utilities.

## Testing and Review

No automated test suite is configured; `npm test` is currently a placeholder. At minimum, run JavaScript syntax checks and `prisma validate`, then manually test successful requests, missing fields, invalid times, past dates, and database failures. Keep commits short and action-oriented. Pull requests should describe endpoint or schema changes, migrations, environment requirements, and validation performed.

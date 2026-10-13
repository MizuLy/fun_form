# Random Form Generator API

Express and Prisma backend for generating permission, certificate, and invitation forms.

## Setup

```bash
npm install
npm run dev
```

The API runs on `http://localhost:6969` by default. Create a local `.env` file with a PostgreSQL connection string:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE"
```

Do not commit `.env` or database credentials.

## Database Commands

```bash
npm.cmd exec -- prisma validate
npm.cmd exec -- prisma generate
npm.cmd exec -- prisma migrate dev
```

The Prisma schema is in `prisma/schema.prisma`, and migration history is in `prisma/migrations/`.

## API Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | `/api/permissions` | Create a permission form |
| GET | `/api/permissions` | List permission forms |
| POST | `/api/certificates` | Create a certificate |
| GET | `/api/certificates` | List certificates |
| POST | `/api/invitations` | Create an invitation |
| GET | `/api/invitations` | List invitations |

Invitation requests require `name`, `event`, `date` (`YYYY-MM-DD`), and `time` (`HH:mm`). The backend combines the date and time into the invitation model's `DateTime` field and rejects dates before today.

## Development Notes

Routes are defined in `src/routes/`, business logic is in `src/controllers/`, and shared code generators are in `src/utils/`. Run JavaScript syntax checks and `prisma validate` before submitting backend changes. No automated test suite is configured yet.

See `AGENTS.md` for contributor conventions and review requirements.

# Random Form Generator

React and Vite frontend for generating permission, certificate, and invitation forms.

## Setup

```bash
npm install
npm run dev
```

The frontend expects the backend API at `http://localhost:6969/api`. Set `VITE_API_URL` in `.env` if the backend uses another address. Restart Vite after changing environment variables.

## Available Commands

```bash
npm run dev      # start local development
npm run build    # create the production bundle
npm run preview  # preview the production bundle
npm run lint     # run ESLint
```

Invitation forms collect a guest name, event, date, and start time. The frontend sends the date and time to `POST /api/invitations`; the backend stores them together as a Prisma `DateTime`. Receipts support browser printing and PNG download.

See `AGENTS.md` for contribution, style, and review guidance.

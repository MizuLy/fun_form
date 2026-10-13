# Repository Guidelines

## Project Structure

This Vite React app lives in `src/`. Routed screens are in `src/pages/`, reusable receipts and UI are in `src/components/`, route definitions are in `src/routes/`, and Axios request modules are in `src/api/`. Tailwind and DaisyUI styles are configured at the project root.

## Development Commands

- `npm install` - install dependencies from `package-lock.json`.
- `npm run dev` - start the Vite development server with hot reload.
- `npm run build` - create the production bundle in `dist/`.
- `npm run preview` - serve the production bundle locally.
- `npm run lint` - run ESLint.

Configure the backend base URL in `.env`:

```env
VITE_API_URL=http://localhost:6969/api
```

Restart Vite after changing environment variables.

## Coding Style and UI Conventions

Use two-space indentation, semicolon-free JavaScript, and single quotes where consistent with the existing ESLint setup. Use PascalCase for React components and pages, camelCase for functions and state, and descriptive API module names. Keep form state and submit behavior in pages; keep reusable receipt presentation in components.

The invitation form sends `name`, `event`, `date` (`YYYY-MM-DD`), and `time` (`HH:mm`) to `POST /api/invitations`. The receipt formats the stored `DateTime` for display and image/PDF export.

## Testing and Review

No unit-test framework is configured. Run `npm run lint` and `npm run build`, then manually verify each form, validation error, API request, receipt, print flow, and image download. UI pull requests should include screenshots and describe affected routes and backend assumptions. Keep secrets out of `.env` commits.

# Todo Mobile App

React Native (Expo) todo app with Firebase persistence.

## Architecture

This project follows a feature-layered structure to keep UI, orchestration, and integrations separated:

- `App.js`: top-level app composition.
- `app/Contexts/`: global providers and shared cross-cutting state.
- `app/navigation/`: route graph and navigation container wiring.
- `app/screens/`: route-level containers.
- `app/hooks/`: stateful UI/data orchestration hooks.
- `app/components/`: presentational UI building blocks.
- `app/services/`: persistence and platform integrations (Firebase, AsyncStorage).

Detailed architecture rationale and boundaries: [ARCHITECTURE.md](./ARCHITECTURE.md).

## Development

Install dependencies:

```bash
npm ci
```

Run Expo dev server:

```bash
npm start
```

## Validation

Run before opening a PR:

```bash
npm ci
npm run lint
npm run start:ci
```

If `npm run lint` is not available, capture that gap in your PR notes and include runtime validation results.

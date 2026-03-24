# SKILLS

Repository-specific guidance for automation agents and contributors.

## Stack and layout

- Runtime: React Native with Expo (`expo@~50`), React 18, React Navigation 6.
- Language: JavaScript (`.js`/`.jsx`).
- Package manager: `npm`.
- Layers under `app/`:
  - `components/` presentational UI
  - `screens/` route-level composition
  - `navigation/` route graph and container wiring
  - `hooks/` state orchestration
  - `services/` external integrations (Firebase, AsyncStorage)
  - `Contexts/` global providers

## Canonical commands

- Install deps: `npm ci`
- Lint: `npm run lint`
- Start dev server: `npm start`
- CI-start smoke: `npm run start:ci`

## Automation guardrails

- Keep Firebase SDK usage in `app/services/*`.
- Keep screens thin; put async/data logic in hooks/services.
- Update `ARCHITECTURE.md` when module boundaries change.
- For UI changes, capture screenshots/recordings when possible and reference them in delivery notes.
- Never commit secrets or `.env` files.

# Générale d'Optique — Mobile App

Expo (SDK 51) + TypeScript + Expo Router + NativeWind v4 + Reanimated 3.

## Status

Foundation in place, pending Button approval before continuing:

- [x] Project setup (Expo Router, NativeWind, TypeScript strict, path aliases)
- [x] Design tokens (`src/theme`)
- [x] `Button` component (`src/components/ui/Button.tsx`) — validation screen at `app/index.tsx`
- [ ] Remaining `ui/` primitives (Card, Badge, Input, Avatar, Switch, Chip, Skeleton, Divider, IconButton)
- [ ] Root/tab layout with the floating animated tab bar
- [ ] Accueil, Rendez-vous, Commandes, Dossier, Profil screens

## Getting started

```bash
npm install
npm run start
```

Then press `i` (iOS simulator), `a` (Android emulator), or `w` (web) — or scan the QR code with Expo Go.

The app boots straight into the Button showcase screen (`app/index.tsx`) so the design system can be reviewed in isolation before the real navigation and screens are wired up.

## Architecture

```
app/                 Expo Router routes
src/
  components/ui/     Design-system atoms (Button, Card, ...)
  components/layout/ Screen chrome (headers, tab bar, safe areas)
  components/features/ Screen-specific composed components
  theme/              Colors, typography, spacing, radius, shadows
  hooks/              Shared behavior (haptics, animated press, ...)
  lib/                API client, storage, utils
  stores/             Zustand stores
  types/              Domain types
  constants/          Config + mock data
```

Path alias `@/*` resolves to `src/*` (see `tsconfig.json` / `babel.config.js`).

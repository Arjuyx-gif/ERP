# CIPL ERP — Dependency Reference

## Runtime Dependencies

| Package | Version | Purpose |
|---|---|---|
| `react` | ^19.2.6 | Core UI library |
| `react-dom` | ^19.2.6 | DOM renderer for React |
| `react-router-dom` | ^7.17.0 | Client-side routing (`BrowserRouter`, `Routes`, `Route`, `Navigate`, `useNavigate`, `useLocation`) |
| `lucide-react` | ^1.17.0 | Icon library — all icons used across Sidebar, Dashboard, Notifications, etc. |

## Dev Dependencies

| Package | Version | Purpose |
|---|---|---|
| `vite` | ^8.0.12 | Build tool and dev server |
| `@vitejs/plugin-react` | ^6.0.1 | Vite plugin — JSX transform and React Fast Refresh |
| `eslint` | ^10.3.0 | JavaScript linter |
| `@eslint/js` | ^10.0.1 | ESLint core JS rules |
| `eslint-plugin-react-hooks` | ^7.1.1 | Enforces Rules of Hooks |
| `eslint-plugin-react-refresh` | ^0.5.2 | Ensures components are safe for HMR |
| `@types/react` | ^19.2.14 | TypeScript types for React (used for IntelliSense even without TS) |
| `@types/react-dom` | ^19.2.3 | TypeScript types for React DOM |
| `globals` | ^17.6.0 | Global variable definitions for ESLint |

## External / CDN Dependencies

| Resource | How loaded | Purpose |
|---|---|---|
| Google Fonts — Inter (400–800) | `<link>` in `index.html` | Primary typeface across all ERP pages |

> Inter is loaded with `display=swap` and two `preconnect` hints for `fonts.googleapis.com` and `fonts.gstatic.com` to minimize layout shift.

## No Chart Library

All pie/donut charts are built with raw SVG arc path calculations inside `MainDashboard.jsx`. No additional charting dependency is required.

## Node / Runtime Requirements

| Tool | Minimum version |
|---|---|
| Node.js | 18.x or newer (Vite 8 requirement) |
| npm | 9.x or newer |

---

### Quick install

```bash
npm install
```

This installs everything listed above from `package.json`. No extra steps needed.

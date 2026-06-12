# CIPL ERP

A React 19 single-page application built with Vite. Includes an authentication flow, a main dashboard, an RFP dashboard, and placeholder pages for modules under development.

---

## Tech Stack

- **React 19** + **Vite 8**
- **React Router DOM v7** — client-side routing
- **Lucide React** — icon library
- **Inter** (Google Fonts) — typography
- Inline styles only — no CSS framework, no Tailwind
- Mock data layer — no backend required to run

See [DEPENDENCIES.md](./DEPENDENCIES.md) for a full breakdown of every package.

---

## Prerequisites

Install these before you begin:

1. **Node.js 18+** — download from [nodejs.org](https://nodejs.org)
   - Verify: `node -v`
2. **npm 9+** — ships with Node
   - Verify: `npm -v`
3. An internet connection the first time (for Google Fonts and npm install)

---

## Setup — Step by Step

### 1. Clone or extract the project

If you received the project as a zip, extract it. If using git:

```bash
git clone <repo-url>
```

### 2. Navigate into the ERP folder

```bash
cd CIPL/ERP
```

### 3. Install dependencies

```bash
npm install
```

This reads `package.json` and downloads all packages into `node_modules/`. Takes ~30–60 seconds on a fresh machine.

### 4. Start the development server

```bash
npm run dev
```

Vite will start and print something like:

```
  VITE v8.x.x  ready in 300 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 5. Open the app

Open your browser and go to:

```
http://localhost:5173
```

You will be redirected to the **Login** page automatically.

---

## Default Login

The app uses mock authentication — any credentials work, or you can use:

- **Email:** any valid email format
- **Password:** any value

Hit **Sign In** → you land on the **Main Dashboard** (`/dashboard`).

---

## Available Routes

| URL | Page |
|---|---|
| `/login` | Sign In |
| `/signup` | Sign Up |
| `/recover` | Recover Password |
| `/dashboard` | Main Dashboard (landing page after login) |
| `/rfp-dashboard` | RFP Tracker Dashboard |
| `/sof-dashboard` | SOF Dashboard *(placeholder)* |
| `/sales-coordinator` | Sales Coordinator Dashboard *(placeholder)* |
| `/tracker` | Tracker *(placeholder)* |
| `/task-inbox` | Task Inbox *(placeholder)* |
| `/reports` | Reports *(placeholder)* |
| `/master-data` | Master Data *(placeholder)* |
| `/settings` | Settings *(placeholder)* |

---

## Project Structure

```
ERP/
├── index.html                   # HTML shell — Inter font loaded here
├── package.json
├── vite.config.js
├── DEPENDENCIES.md              # Full dependency reference
│
└── src/
    ├── main.jsx                 # React root mount
    ├── App.jsx                  # Router + all route definitions
    ├── index.css                # Global reset, Inter font, .no-scrollbar, .thin-scrollbar
    │
    ├── components/
    │   ├── dashboard/
    │   │   ├── KanbanBoard.jsx      # Kanban column container
    │   │   ├── KanbanCard.jsx       # Individual kanban card
    │   │   ├── NotificationPanel.jsx # Slide-in notification panel (shared)
    │   │   ├── ReminderModal.jsx     # Reminder modal
    │   │   └── ViewAllModal.jsx      # RFP view-all table modal
    │   ├── layout/
    │   │   └── Sidebar.jsx          # App sidebar with path-aware navigation
    │   └── ui/
    │       ├── Badge.jsx
    │       ├── DynamicIcon.jsx      # Maps string icon names to Lucide components
    │       ├── Tag.jsx
    │       └── UnderlineInput.jsx
    │
    ├── hooks/
    │   └── useDashboard.js          # Data-fetching hook for RFP dashboard
    │
    ├── pages/
    │   ├── auth/
    │   │   ├── AuthLayout.jsx
    │   │   ├── authStyles.js
    │   │   ├── RecoverPassword.jsx
    │   │   ├── SignIn.jsx
    │   │   └── SignUp.jsx
    │   ├── dashboard/
    │   │   ├── MainDashboard.jsx    # Main landing dashboard
    │   │   └── RFPDashboard.jsx     # RFP Tracker dashboard
    │   └── PlaceholderPage.jsx      # Shared "Coming Soon" page
    │
    └── services/
        ├── api.js                   # API client (currently unused — mock only)
        ├── dashboardService.js      # Service layer called by useDashboard
        └── mockData.js              # All static data — KPIs, pipeline, alerts, notifications
```

---

## Other Scripts

```bash
# Build for production
npm run build
# Output goes to dist/ — serve with any static host

# Preview the production build locally
npm run preview

# Run ESLint
npm run lint
```

---

## Key Design Decisions

| Decision | Reason |
|---|---|
| Inline styles only | No CSS framework dependency; matches Figma designs pixel-by-pixel |
| `mockData.js` as the single source of truth | Backend not yet integrated; swap the service layer functions when an API is ready |
| `DynamicIcon.jsx` | Sidebar and alert icons are data-driven strings mapped to Lucide components at runtime |
| `.no-scrollbar` / `.thin-scrollbar` CSS classes | Consistent scrollbar behavior: sidebar hidden, pipeline sleek 4px |
| `PlaceholderPage` | All unbuilt routes share one component; sidebar highlights correctly via `useLocation` |
| SVG donut charts | No chart library needed; arc paths computed manually in `MainDashboard.jsx` |

---

## Troubleshooting

**`npm install` fails**
- Ensure Node.js 18+ is installed: `node -v`
- Delete `node_modules/` and `package-lock.json`, then re-run `npm install`

**Blank page / white screen**
- Open browser DevTools (F12) → Console tab and check for errors
- Make sure you're on `http://localhost:5173`, not `file://`

**Fonts not loading (shows system font)**
- You need an internet connection for Google Fonts on first load
- Once the browser caches them, fonts work offline

**Port 5173 already in use**
- Vite will automatically try the next available port (5174, 5175...)
- Or specify a port: `npm run dev -- --port 3000`

**Icons not rendering**
- `lucide-react` v1.17.0 must be installed. Run `npm install` to confirm.

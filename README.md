# Healthcare SaaS - Production Audit & Implementation

> [!IMPORTANT]
> **CRITICAL TESTING INSTRUCTIONS**
> 1. **Enable Notifications**: To test the Service Worker integration, you **must allow notifications** when prompted by the browser. If the prompt was dismissed, please enable notifications in your browser's site settings.
> 2. **Test Account Credentials**: For a quick walkthrough without creating your own account, use:
>    - **Email**: `doctor@clinic.com`
>    - **Password**: `Arvgyd@1234`
> 3. **Manual Notification Trigger**: Since the application uses a mock data layer, use the **"🔔 Demo"** button located on the **Patients Page** header to trigger a local push notification and verify the Service Worker lifecycle.

---

**A feature‑rich B2B healthcare SaaS dashboard built with React, TypeScript, and Vite.**

---

## Live Demo

- [Live Demo](https://care-panel-iota.vercel.app/)
- [Repository](https://github.com/22-vanshika/CarePanel)

---

## Tech Stack

| Technology | Purpose | Why Chosen |
|------------|---------|------------|
| **React + TypeScript** | UI framework & static typing | Strong type safety, component model, excellent ecosystem |
| **Vite** | Development server & bundler | Instant HMR, lightning‑fast builds, zero‑config TS support |
| **Zustand** | State management | Minimal boilerplate, scalable atomics, perfect for micro‑frontend boundaries |
| **Firebase Authentication** | Auth & session persistence | Secure, out‑of‑the‑box auth flows, easy integration with service workers |
| **React Router v6** | Client‑side routing & code‑splitting | Declarative routes, built‑in lazy loading, fine‑grained navigation guards |
| **Tailwind CSS** (custom token system) | Styling & design tokens | Utility‑first, themable via CSS variables, no CSS‑in‑JS runtime cost |
| **Service Worker** | Push notifications & offline cache | Enables background notifications and progressive web app capabilities |
| **Spline + Framer Motion** | 3D models & animations | High‑end visual aesthetics, smooth transitions, and interactive 3D backgrounds |

---

## Architecture Overview

```
src/
├─ app/                 # App‑shell (router, global stores, providers)
│   ├─ router.tsx
│   ├─ store/
│   │   ├─ authStore.ts
│   │   └─ uiStore.ts
│   └─ App.tsx
├─ mocks/               # Mock data layer (Simulated API responses)
├─ modules/             # Micro‑frontend style feature modules
│   ├─ auth/            # Login, token handling, firebase services
│   ├─ patients/        # Patient list, detail, CRUD hooks
│   ├─ analytics/       # Dashboard, charts, metric cards
│   └─ notifications/   # Service‑worker subscription, UI list
├─ shared/              # Cross‑module primitives
│   ├─ components/      # UI primitives (Button, Card, PageSkeleton, …)
│   ├─ hooks/           # Generic reusable hooks
│   ├─ services/        # API utilities & shared data services
│   └─ utils/           # Helper functions (date utils, debounce, …)
├─ styles/              # Design system tokens (CSS variables)
└─ index.html
```

### Key Concepts

* **Modular micro‑frontend approach** – each domain lives under `src/modules/<domain>/`. No module imports from another; they communicate only through shared services or global stores, preserving clear boundaries.
* **App Shell pattern** – `src/app/` contains the router, layout, and global providers. The shell stays mounted while lazy‑loaded feature bundles are swapped in/out.
* **Strict module boundaries** – lint rules (or manual review) enforce that `modules/*` never import from sibling modules; they only import from `shared/*` or the app shell. This keeps bundles independent and allows future separate deployment.

---

## State Management Strategy

| Layer | Store / Hook | Responsibility |
|-------|--------------|----------------|
| **Global app state** | `authStore`, `uiStore` (Zustand) | Auth session, theme, sidebar collapse, toast queue – data needed across the whole app |
| **Domain state** | `patientStore`, `notificationStore` (Zustand) | Domain‑specific entities that are shared by several components within the same module |
| **Server state** | custom async hooks (`useAnalyticsData`, `usePatient`, …) | Fetching, caching, and error handling of remote data; never stored in a global store to avoid stale duplication |

* **Why Zustand?** – Light‑weight, mutable‑free API, supports atomic selectors out of the box, and works without the boilerplate of Redux (actions, reducers, thunks). Perfect for the “few global slices, many domain slices” layout.
* **Atomic selectors** – Each component subscribes only to the exact piece of state it needs (`state => state.unreadCount`). This prevents unnecessary re‑renders and keeps UI snappy, a pattern used throughout the patient list and notification badge.

---

## Key Design Decisions

| Decision | Reasoning |
|----------|------------|
| **Firebase abstracted behind `firebaseAuth.ts`** | Centralises all Firebase SDK calls, makes it trivial to swap the provider or mock it for tests; keeps auth logic out of UI components. |
| **`authStore` placed in `app/` instead of `modules/auth/`** | Authentication state is required by the whole shell (protected routes, header, service‑worker), so a global store eliminates circular imports and respects the App‑Shell boundary. |
| **Patient list data fetched in hooks, not store** | List data is read‑only for the UI and refreshed on each navigation; storing it would duplicate cache logic and increase store complexity. |
| **`unreadCount` derived selector, not persisted** | The count is a pure calculation (`notifications.filter(n => !n.read).length`). Deriving it on‑the‑fly guarantees consistency without extra actions. |
| **`React.memo` on `PatientCard` & `MetricCard`** | These cards are rendered inside large grids; memoisation avoids re‑rendering all cards when unrelated state changes (e.g., sidebar toggle). |
| **Lazy loading on **all** protected routes** | Each module is code‑split (`React.lazy` + `Suspense`). The initial bundle stays < 150 KB, and the page‑skeleton UI gives a polished loading experience. |

---

## Module Breakdown

| Module | Key Files | Responsibility |
|--------|-----------|----------------|
| **auth** | `pages/LoginPage.tsx`, `services/firebaseAuth.ts`, `store/authStore.ts` | User sign‑in, token refresh, session persistence |
| **patients** | `pages/PatientsPage.tsx`, `components/PatientCard.tsx`, `hooks/usePatient.ts` | CRUD UI for patient records, list/grid view toggling |
| **analytics** | `pages/DashboardPage.tsx`, `pages/AnalyticsPage.tsx`, `components/MetricCard.tsx` | KPI displays, charts, trend visualisation |
| **notifications** | `services/notificationService.ts`, `components/NotificationList.tsx`, `store/notificationStore.ts` | Push‑notification subscription, UI badge, background handling |
| **shared** | `components/*`, `hooks/*`, `utils/*`, `services/*` | Design system tokens, reusable UI primitives, generic utilities |

---

## Getting Started

### Prerequisites

- **Node ≥ 20** (recommended)
- **pnpm** or **npm** (the repo uses npm scripts)
- **Firebase project** (for auth & push)

### Clone & Install

```bash
git clone https://github.com/your-username/healthcare-saas.git
npm install
```

### Environment Variables

Create a `.env` file at the project root (Vite prefixes are `VITE_`):

```dotenv
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=1234567890
VITE_FIREBASE_APP_ID=1:...:web:...
```

### Run Locally

```bash
npm run dev
```

Open `http://localhost:5173` – Vite’s dev server will hot‑reload on file changes.

---

## Features

- **Authentication** – Email/password via Firebase, persisted session across reloads, automatic token refresh.
- **Patient Directory** – Grid & list toggle, lazy‑loaded detail view, memoised cards for performance.
- **Analytics Dashboard** – Metric cards, admissions chart, lazy‑loaded chart components, skeleton UI while loading.
- **Service‑Worker Notifications** – Background push handling, UI badge, subscription management.
- **Responsive Layout** – Collapsible sidebar, mobile‑first design.
- **Design Token System** – All colors, spacing, and typography are defined as CSS variables (`--color-primary`, `--radius-base`, …) and consumed via Tailwind’s utility classes, making the UI **dark‑mode ready via CSS variable token system**.

---

## Known Improvements

| Area | Planned Enhancement |
|------|---------------------|
| **Hook extraction** | Move the click‑outside detection logic to a reusable `useClickOutside` hook (currently duplicated). |
| **Server state** | Integrate **React Query** (or TanStack Query) for smarter caching, background refetch, and stale‑while‑revalidate. |
| **Backend integration** | Replace the mock data layer with real REST/GraphQL endpoints and add proper error handling. |
| **Testing** | Add unit & integration tests with **Vitest** + **React Testing Library** for critical components (Login, PatientCard, Dashboard). |
| **RBAC** | Implement a `UserRole` enum and guard routes/components based on role (e.g., admin vs. clinician). |
| **CI/CD** | GitHub Actions workflow for lint, type‑check, and Vite preview deployment to Vercel. |

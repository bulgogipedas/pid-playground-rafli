# LMS PID — UI/UX & Accessibility Audit

**Product:** Learning Management System — PT Pelita Indonesia Djaya (LMS PID)
**Stack:** Next.js 16 (App Router) · React 19 · Tailwind v4 · shadcn/ui
**Scope audited:** 25 routes under `/dashboard`, the app shell (`sidebar`, `header`, `layout`), `login`, the data/i18n/auth layer.
**Method:** Nielsen's 10 usability heuristics + WCAG 2.2 AA + responsive review (360px+). Findings are grounded in specific files.
**Constraints honored:** Bahasa Indonesia primary, PELNI theme kept, all business logic / routes / roles / data models preserved, mock data kept only where no backend exists.

Severity legend:
- **P0 — Blocker:** breaks a task, or is an accessibility/compliance failure.
- **P1 — High friction:** materially degrades usability or trust.
- **P2 — Polish:** consistency, refinement, delight.

---

## 1. Executive summary

The application is feature-complete as a prototype: 25 role-aware screens, a role-based sidebar, a full learning player with quizzes, and a broad shadcn/ui component inventory. The information architecture and PELNI visual identity are solid. However, the app is missing the **system-feedback and accessibility layer** that a production LMS requires, and it leans on **per-screen ad-hoc styling** instead of a normalized design system.

The three highest-impact themes:

1. **No global feedback system.** `Toaster`/`sonner` is never mounted (`app/layout.tsx` wraps only `AuthProvider`); `toast`/`isLoading`/`Skeleton` appear **only** in `app/login/page.tsx`. Every mutation across the other 24 screens (approve, reject, save, delete, submit, upload) completes silently — violating heuristic #1 (visibility of system status).
2. **Accessibility gaps that fail WCAG 2.2 AA.** Icon-only controls have no accessible name (`aria-label`/`sr-only` = 0 occurrences across `app/`), heading hierarchy is inconsistent, and there is no skip link or landmark labeling. This is a compliance blocker, not polish.
3. **Design-system drift.** Colors are a mix of semantic tokens and hardcoded values (`bg-[#F8FAFC]` in `app/dashboard/layout.tsx`, `border-gray-100` in `header.tsx`, `bg-[#0879B5]` / `bg-[#059669]` in `stats-cards.tsx`). There is no shared PageHeader/DataTable/StatusBadge primitive, so 25 screens each re-implement the same patterns slightly differently.

---

## 2. Cross-cutting findings

### 2.1 Visibility of system status (Heuristic #1)
- **P0 — No toast/notification feedback.** `components/ui/sonner.tsx` and `toaster.tsx` exist but are not mounted in `app/layout.tsx`. Mutations in `persetujuan`, `pengguna`, `konten`, `upload-sertifikat`, `validasi-sertifikat`, `surat-tugas`, `pengaturan` give no success/error confirmation.
- **P0 — No loading states on data screens.** `Skeleton`/`isLoading` used only in `login`. Even simulated fetches (e.g. the 1s delay in `login`) have no equivalent on dashboard screens, so role switches / filters snap with no perceived responsiveness.
- **P1 — No empty states.** `components/ui/empty.tsx` is unused across `app/`. Filtered tables that return nothing render a bare table.

### 2.2 Accessibility (WCAG 2.2 AA)
- **P0 — Icon-only buttons lack accessible names.** Header notification bell and search (`header.tsx`), sidebar collapse/expand and mobile open/close (`sidebar.tsx`), and player transport controls (`belajar/[courseId]`) are icon-only with no `aria-label`/`sr-only`. Screen-reader users hear "button".
- **P0 — No skip-to-content link and unlabeled landmarks.** `layout.tsx` renders `<main>` but there is no skip link and `<nav>`/`<header>` are not distinguished for AT.
- **P1 — Heading hierarchy inconsistent.** The dashboard landing (`app/dashboard/page.tsx`) has no `<h1>`; it opens with `WelcomeSection`. Several pages jump levels. Each route needs exactly one `<h1>`.
- **P1 — Decorative search input is a focus trap of confusion.** The header search (`header.tsx`) is a real `<input>` with no handler — keyboard users land on a control that does nothing.
- **P1 — Color-only status.** Some status is conveyed by color alone; needs icon + text (partly present in badges, inconsistent).
- **P2 — Focus-visible rings** are default; verify 3:1 contrast against the navy sidebar and colored buttons.

### 2.3 Consistency & standards (Heuristic #4) / Design system
- **P1 — Token drift.** Hardcoded values remain: `bg-[#F8FAFC]` (`dashboard/layout.tsx`), `border-gray-100` (`header.tsx`, `stats-cards.tsx`), `bg-[#0879B5]`/`bg-[#059669]`/`text-[#059669]` (`stats-cards.tsx`), `bg-gray-900` (player). These should map to `--background`, `--border`, `--primary`, `--success`, etc.
- **P1 — No shared page scaffold.** There is no `PageHeader` (title + description + breadcrumb + actions) primitive, so 25 pages each hand-roll headers with differing spacing/typography.
- **P1 — No shared DataTable / StatusBadge / Toolbar.** Table pages (`persetujuan` 1080 lines, `sertifikat` 1016, `konten` 948, `pengajuan` 807) duplicate filter bars, pagination, and status chips. This is the single biggest source of inconsistency and maintenance cost.
- **P2 — Mixed font-role usage.** `font-serif` is used for headings via Plus Jakarta; confirm the serif/sans mapping is intentional and consistent.

### 2.4 Navigation & orientation (Heuristics #1, #7)
- **P0 — No breadcrumbs.** `components/ui/breadcrumb.tsx` is unused. With 25 nested routes and no breadcrumb, users deep in a flow (e.g. `belajar/[courseId]`) lack orientation and quick escape.
- **P1 — Role switcher exposed in the shell.** `sidebar.tsx` renders a role `Select` for all users. This is a demo affordance that reads as a real (and alarming) permission control in a production UI. Should be gated/labeled as demo-only.
- **P2 — Active-state logic edge cases.** `pathname.startsWith(item.href)` can mark parent items active for sibling routes sharing a prefix.

### 2.5 Error prevention & recovery (Heuristics #5, #9)
- **P1 — Destructive actions lack confirmation + feedback.** Delete/reject flows need an `AlertDialog` confirm plus a toast result. `AlertDialog` is used in the player but not consistently on management screens.
- **P1 — No form validation feedback.** `components/ui/form.tsx`/`field.tsx` exist; management forms (`pengaturan`, request forms) should surface inline errors and disabled/pending submit states.
- **P2 — No route-level `error.tsx` / `not-found.tsx` / `loading.tsx`.** App Router error and loading boundaries are absent.

### 2.6 Responsiveness (360px+)
- **P1 — Fixed dimensions risk overflow.** The learning player uses `h-screen` with a fixed `w-80` content sidebar and a `bg-gray-900` stage; below ~768px the two-column layout needs to stack, and the fixed heights fight mobile browser chrome.
- **P1 — Wide tables lack a mobile strategy.** 6–10 column tables (`persetujuan`, `pengguna`, `sertifikat`) need horizontal scroll containers or a card/stacked layout at small widths.
- **P2 — Header meta hidden on mobile** (`date` is `hidden md:flex`) — acceptable, but the search should collapse to an icon action rather than eat width.

### 2.7 Internationalization (bilingual readiness)
- **P1 — i18n coverage is shallow.** `lib/i18n.ts` covers nav + a handful of keys; the vast majority of on-screen copy is hardcoded Indonesian string literals inside each page. The EN switcher therefore only translates the chrome, not content. "Bilingual readiness" requires either a fuller dictionary or a documented plan; at minimum the switcher should not imply full translation.

### 2.8 Auth & session (prototype-appropriate, noted for honesty)
- **P2 — Mock auth via localStorage.** `lib/auth-context.tsx` stores the full user object in `localStorage` and validates `password.length < 4`. This is acceptable per the "keep mock where no backend exists" constraint, but should be clearly labeled as a simulated SSO stub so it is not mistaken for real auth.

---

## 3. Per-screen notes (grouped)

**Shell** (`layout.tsx`, `sidebar.tsx`, `header.tsx`): tokenize backgrounds/borders; add skip link + landmark labels; label all icon buttons; wire a real notifications affordance or mark decorative; gate the role switcher; add breadcrumb slot.

**Dashboard landing** (`page.tsx` + widgets): add an `<h1>`; tokenize `stats-cards.tsx` colors; add loading skeletons for the chart/cards; ensure the chart has an accessible text alternative.

**Learning player** (`belajar/[courseId]`, 964 lines): label transport controls; make the layout stack < md; keep the quiz timer but announce time via `aria-live`; move the large inline quiz fixtures toward `lib/data` for consistency (non-breaking).

**Management tables** (`persetujuan`, `pengguna`, `konten`, `pengajuan`, `sertifikat`, `trainer`, `surat-tugas`, `validasi-sertifikat`, `upload-sertifikat`): adopt a shared DataTable + Toolbar + StatusBadge; add empty/loading states; confirm destructive actions; toast every mutation; wrap tables in responsive scroll containers.

**Reporting/analytics** (`laporan`, `laporan-tim`, `laporan-divisi`, `laporan-konten`, `manajemen`, `budget`, `tna`, `audit`): tokenize chart palette (`--chart-1..8`); give every chart a caption/summary and accessible fallback; consistent filter toolbar; loading states.

**Settings** (`pengaturan`): inline validation + pending/disabled submit + success toast.

**Login** (`login`): already has loading + toast patterns — use it as the reference implementation to propagate elsewhere.

---

## 4. What is already good (preserve)
- Clear role-based IA and section grouping in `sidebar.tsx`.
- Consistent PELNI identity after the token/hex remap (navy shell, PELNI-blue accents).
- Rich, realistic mock data in `lib/data/*` — good for demoing flows.
- Broad shadcn/ui inventory already present — the primitives needed for every fix are installed; the work is composition and wiring, not new dependencies.

See `docs/ux-scorecard.md` for scored dimensions and `docs/improvement-plan.md` for the prioritized, file-mapped backlog.

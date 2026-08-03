# LMS PID — Improvement Plan (Prioritized Backlog)

Chosen implementation scope: **Cross-cutting normalization + key user journeys.** No breaking changes; business logic, roles, routes, data models preserved. After each batch: run `lint`, `typecheck`, tests, and production build, then re-score `docs/ux-scorecard.md`.

Priorities:
- **P0 — Blocker** (task-breaking or accessibility/compliance failure)
- **P1 — High friction**
- **P2 — Polish**

---

## Batch 1 — Global feedback & accessibility foundation (P0, cross-cutting)
Highest impact, touches every screen, lowest risk.

1. **Mount toast system.** Add `<Toaster />` (`components/ui/sonner.tsx`) to `app/layout.tsx`. _Files:_ `app/layout.tsx`.
2. **Wire mutation feedback.** Add success/error `toast()` calls to approve/reject/save/delete/submit/upload handlers on the key journey screens. _Files:_ `persetujuan`, `pengguna`, `konten`, `upload-sertifikat`, `validasi-sertifikat`, `pengaturan`.
3. **Accessible names for icon controls.** Add `aria-label` + `sr-only` text to all icon-only buttons. _Files:_ `components/dashboard/header.tsx`, `components/dashboard/sidebar.tsx`, `belajar/[courseId]/page.tsx`.
4. **Skip link + landmarks.** Add skip-to-content link and label `<nav>`/`<main>`/`<header>`. _Files:_ `app/dashboard/layout.tsx`, `sidebar.tsx`, `header.tsx`.
5. **Fix decorative search.** Either make header search functional (filter/command) or convert to a properly labeled disabled/coming-soon affordance. _Files:_ `header.tsx`.

**Acceptance:** every mutation shows a toast; axe/Lighthouse a11y has no critical violations on shell + dashboard; all interactive controls have accessible names; keyboard skip link works.

---

## Batch 2 — Design-system normalization (P1, cross-cutting)
Underpins visual consistency for every screen.

6. **Tokenize residual hardcoded values.** Replace `bg-[#F8FAFC]`, `border-gray-100`, `bg-[#0879B5]`, `bg-[#059669]`, `text-[#059669]`, `bg-gray-900` with semantic tokens. _Files:_ `dashboard/layout.tsx`, `header.tsx`, `stats-cards.tsx`, `belajar/[courseId]`.
7. **`PageHeader` primitive.** Title (`<h1>`) + optional description + breadcrumb slot + actions slot. Adopt on key journey screens. _Files:_ new `components/dashboard/page-header.tsx` + breadcrumb wiring via `components/ui/breadcrumb.tsx`.
8. **`StatusBadge` primitive.** Centralize status → color+icon+label mapping (icon + text, never color-alone). _Files:_ new `components/dashboard/status-badge.tsx`.
9. **`DataTable` shell + `Toolbar`.** Shared filter/search/pagination + responsive scroll container + integrated empty/loading states. Adopt on the heaviest tables. _Files:_ new `components/dashboard/data-table.tsx`; adopt in `persetujuan`, `pengguna`, `sertifikat`, `konten`.

**Acceptance:** no hardcoded color literals remain on touched screens; one `<h1>` per page; shared primitives used on the key journeys; visual diff reviewed in browser.

---

## Batch 3 — Key journeys deepened (P1)
Highest-value flows get loading, empty, confirm, and responsive treatment end-to-end.

10. **Approvals (`persetujuan`):** skeleton on load, empty state on filtered-empty, `AlertDialog` confirm on reject, toast results, responsive table.
11. **Learning player (`belajar/[courseId]`):** stack layout `< md`, labeled transport controls, `aria-live` quiz timer, accessible progress.
12. **User management (`pengguna`) & content (`konten`):** confirm + toast on destructive actions, inline form validation, pending/disabled submit.
13. **Certificates (`sertifikat`, `upload-sertifikat`, `validasi-sertifikat`):** upload progress/feedback, empty states, validation.
14. **Reporting (`laporan*`, `manajemen`, `budget`, `tna`):** tokenized `--chart-*` palette, chart captions + accessible text alternative, consistent toolbar, loading states.

**Acceptance:** each journey has loading + empty + error + success feedback and works at 360px; destructive actions confirmed; charts have text alternatives.

---

## Batch 4 — Route robustness & polish (P2)
15. Add `loading.tsx` / `error.tsx` / `not-found.tsx` boundaries for `/dashboard`.
16. Gate/label the role switcher as demo-only (`sidebar.tsx`).
17. Refine focus-visible ring contrast against navy/colored surfaces.
18. Tighten active-nav matching edge cases (`sidebar.tsx`).
19. Document i18n coverage + a fill-out plan in `docs/`; ensure the EN switcher does not over-promise.

---

## Explicitly out of scope (per constraints)
- No real backend/auth (mock retained where no backend exists; label as simulated SSO).
- No route/permission/data-model changes; no feature removal, renaming, or merging.
- No new heavy dependencies — all needed primitives already exist in `components/ui`.

## Verification checklist (run after every batch)
- [ ] `pnpm lint`
- [ ] `pnpm exec tsc --noEmit` (typecheck)
- [ ] tests (if present)
- [ ] `pnpm build` (production build)
- [ ] Browser pass at 1440px and 360px on touched screens
- [ ] Re-score `docs/ux-scorecard.md`

# LMS PID — UX Scorecard

Scored 1–5 (1 = failing, 3 = acceptable, 5 = excellent). Baseline = current state at audit time. Each row lists the primary evidence and the target after the planned work.

| Dimension | Base | B1 | B2 | Target | Evidence & rationale |
|---|:--:|:--:|:--:|:--:|---|
| **Visibility of system status** | 2 | 4 | 4 | 5 | B1: `Toaster` mounted; key mutations toast. Remaining: loading skeletons (Batch 3). |
| **Feedback on actions (mutations)** | 2 | 4 | 4 | 5 | B1: approve/reject/bulk, program/user/course/cert/settings mutations toast. Remaining screens in Batch 3. |
| **Loading & empty states** | 1 | 2 | 3 | 4 | B2: `DataTable` primitive adds `TableEmptyState`/`TableLoadingState`; pengguna table now has a filtered-empty row. Skeletons per-journey in Batch 3. |
| **Accessibility (WCAG 2.2 AA)** | 2 | 4 | 4 | 5 | B1 shell/control names; B2: breadcrumb trails + one `<h1>` per adopted page via `PageHeader`, icon+text `StatusBadge` (no color-alone). Full per-screen sweep in Batch 3/4. |
| **Keyboard & focus** | 2 | 3 | 3 | 4 | Skip link + labeled search landmark. Focus-ring contrast tuning in Batch 4. |
| **Navigation & orientation** | 2 | 3 | 4 | 4 | B2: breadcrumbs adopted on persetujuan + pengguna via `PageHeader`; `aria-current` on nav. |
| **Consistency & design system** | 2 | 2 | 4 | 5 | B2: shell + pengguna tokenized (no hex literals); shared `PageHeader`/`StatusBadge`/`DataTable` primitives created + adopted. Remaining screens adopt in Batch 3. |
| **Visual design / brand** | 4 | 4 | 4 | 5 | Strong PELNI identity; spacing/typography rhythm refinement ongoing. |
| **Responsiveness (360px+)** | 3 | 3 | 4 | 5 | B2: `PageHeader` actions stack at 360px (verified); `ResponsiveTable` scroll container available. Player/wide tables in Batch 3. |
| **Error prevention & recovery** | 2 | 3 | 3 | 4 | `AlertDialog` confirms + inline validation in Batch 3. |
| **Information architecture** | 4 | 4 | 4 | 4 | Role-based grouping is clear and appropriate — preserve as-is. |
| **Internationalization** | 2 | 2 | 2 | 3 | i18n coverage plan in Batch 4. |
| **Content & microcopy** | 3 | 3 | 3 | 4 | Consistent Indonesian toast tone; empty/error copy expanding in Batch 3. |
| **Performance (perceived)** | 3 | 3 | 3 | 4 | Skeletons/code-split in Batch 3. |
| **Trust & security signaling** | 2 | 2 | 2 | 3 | Label simulated SSO in Batch 4. |

**Weighted overall — Baseline ≈ 2.4 / 5 → After Batch 1 ≈ 3.2 / 5 → After Batch 2 ≈ 3.6 / 5 → Target ≈ 4.3 / 5.**

Batch 1 lifted feedback + accessibility out of the failing band; Batch 2 drives the design-system/consistency and navigation gains.

### Progress log
- **Batch 1 (feedback & accessibility foundation):** DONE. Toaster mounted; mutation toasts wired on persetujuan, pengguna, konten, upload-sertifikat, validasi-sertifikat, pengaturan; skip link + landmarks; accessible names across shell, sidebar, header, and learning player; labeled search. Verified: production build passes (25/25 routes); browser confirms toast + a11y tree. Pre-existing TS errors in `budget`/`pengajuan` (untouched) noted for a later batch.
- **Batch 2 (design-system normalization):** DONE. Tokenized residual hardcoded values in `dashboard/layout.tsx`, `header.tsx`, `stats-cards.tsx`, and `pengguna` (backgrounds, borders, status/role colors → semantic tokens). Created shared primitives `components/dashboard/page-header.tsx` (breadcrumb + single `<h1>` + actions), `status-badge.tsx` (icon+text semantic tones), and `data-table.tsx` (`DataTableToolbar`, `ResponsiveTable`, `TableEmptyState`, `TableLoadingState`). Adopted `PageHeader` on persetujuan + pengguna and `StatusBadge` + filtered-empty row on the pengguna table. Verified: production build passes (25/25); browser checked at 1440px and 360px. Same 4 pre-existing TS errors in untouched files remain.

## Scoring method
- Dimensions weighted toward task success and compliance (feedback, accessibility, consistency count double the aesthetic dimensions).
- Scores are evidence-based (file references in `docs/ui-ux-audit.md`), not impressionistic.
- Re-score after each implementation batch to track movement (Phase: re-audit).

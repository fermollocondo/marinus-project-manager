# Frontend Conventions

**Ticket:** SCRUM-24 · **Owner:** Fernanda · **Status:** Draft v0.2 — for team review

These conventions apply to the React app in `frontend/` (React + Vite + Tailwind v4, JavaScript). They add detail to what `docs/ARCHITECTURE.md` and `docs/CONTRIBUTING.md` already say; they do not replace them. If this file disagrees with those two, they win and this file gets fixed.

> **Drafting note:** a first draft of this file was written with AI assistance and then checked against `ARCHITECTURE.md`, `CONTRIBUTING.md`, `DATA_MODEL.md`, `frontend/package.json` and `frontend/src/index.css`.

---

## 1. Project layout

```
frontend/src/
  api/          all backend calls (client.js)
  components/   reusable pieces (AppShell.jsx, Field.jsx, ...)
  pages/        one file per screen (IntakePage.jsx, ...)
  index.css     Tailwind setup and shared design tokens
  main.jsx, App.jsx
```

- **File names** (from CONTRIBUTING): `PascalCase.jsx` for components and pages, `camelCase.js` for everything else.
- **Backend calls live in `src/api/` only.** No `fetch` calls inside components. Non-GET requests send Django's CSRF token (`X-CSRFToken`).
- **Reuse before creating.** Check `components/` first (for example `Field.jsx` for form inputs) before writing a new input, button, or layout piece. If something appears on a second page, move it to `components/`.
- **Pages compose, components do one job.** A component takes props and does one thing. If it passes about 150 lines, split it.
- **Name by purpose:** `ApproveEstimateButton`, not `Button2`.

## 2. Libraries (already agreed — do not add alternatives)

| Need | Use |
|------|-----|
| Routing | react-router |
| Server data | @tanstack/react-query |
| Forms and validation | react-hook-form + zod |
| English / Spanish | i18next + react-i18next |
| Styling | Tailwind v4 |

Adding a new library, framework, or icon set needs team agreement first (see `AI_GUIDELINES.md`, rule 4).

## 3. Design tokens

Tokens are defined once in `frontend/src/index.css` under `@theme`. **Use them as Tailwind classes. Do not write raw hex colors or one-off font names.**

| Token | Class examples | Use |
|-------|----------------|-----|
| `--color-brand` | `bg-brand`, `text-brand` | Primary buttons, links, key accents |
| `--color-brand-dark` | `bg-brand-dark` | Hover / pressed state of brand |
| `--color-brand-light` | `bg-brand-light` | Subtle highlights, selected rows |
| `--color-ink` | `text-ink` | Body text |
| `--color-surface` | `bg-surface` | Page background |
| `--color-line` | `border-line` | Borders and dividers |
| `--color-warning` | `text-warning` | Cautions |
| `--color-danger` | `text-danger` | Errors, destructive actions |
| `--font-sans` | (default) | All text |

**Spacing and sizing:** use Tailwind's scale (`p-4`, `gap-6`). No arbitrary values like `p-[13px]` unless there is a documented reason.

**Adding a token:** change `index.css` in a PR and tell the team. Never create a parallel set of colors in another file.

**Missing tokens to propose (not added yet):** a muted/secondary text color, a success color, and a visible focus-ring color. Until they exist, use the closest existing token and leave a comment.

## 4. Breakpoints

Mobile first (from ARCHITECTURE): write the phone layout first, then add changes with `sm:`, `md:`, `lg:`.

| Prefix | Min width | What usually changes |
|--------|-----------|----------------------|
| (none) | 0 | Single column, stacked fields, full-width primary button |
| `sm:` | 640 px | Two-column forms where useful |
| `md:` | 768 px | Side-by-side summary and details |
| `lg:` | 1024 px | Full tables, sidebars |

These are Tailwind's defaults. **Smallest supported width: 320 px**, with no whole-page horizontal scroll.

## 5. Text, language, and data

- **No hard-coded UI text.** Add keys to both the English and the Spanish translation files (CONTRIBUTING). Spanish runs about 20–30% longer, so do not fix widths on buttons or labels.
- **Money:** the backend stores money as `DecimalField` and calculates `line_total = unit_price × quantity` (DATA_MODEL). In the UI:
  - Show the totals the server returns; do not make the browser the source of truth for money.
  - Do not do money arithmetic with floating-point numbers in the UI.
  - Format only for display with `Intl.NumberFormat`.
  - *Open question:* confirm in `/api/docs` whether decimals arrive as strings or numbers, and document it here.
- **API field names** are `snake_case` on both sides, exactly as shown in `/api/docs` (CONTRIBUTING). Do not invent field names; compare with `docs/DATA_MODEL.md`.
- **Dates:** format with `Intl.DateTimeFormat` using the active language.

## 6. Quality rules for every screen

**Touch and input**
- Buttons and tap targets at least **44 × 44 px**, with space between neighbors.
- Text inputs **16 px or larger** (smaller makes iPhones zoom the page when a field gets focus).
- Right input type and `inputmode` (`email`, `tel`, `decimal`).
- Every field has a visible `<label>`; a placeholder is not a label.

**Layout**
- Wide tables scroll inside their own container (`overflow-x-auto`), not the whole page.
- Images and media use `max-w-full`.
- Respect device safe areas on full-bleed layouts.

**Accessibility**
- Text contrast at least 4.5:1.
- Keyboard focus is always visible. Do not use `outline-none` without a replacement focus style (for example `focus-visible:ring-2`).
- Real elements: `<button>` for actions, `<a>` for navigation, headings in order.
- Set `<html lang>` to the active language.
- Never show status with color alone (add text or an icon).

**Safety**
- Never inject user-typed text as raw HTML; let React render it as text.
- Approved or signed documents are **read-only in the UI** (`disabled` / `readOnly`, not only CSS). Permissions are enforced on the server; the UI only reflects them (`AI_GUIDELINES.md`, rule 5).

## 7. Pull request checklist

Follows CONTRIBUTING's workflow. Before opening a PR:

- [ ] Branch name follows `feature/W3-123-short-name`
- [ ] `cd frontend && npm run lint && npm run format:check && npm run build` passes
- [ ] Tokens and shared components used; no raw colors or hard-coded text
- [ ] Both English and Spanish keys added
- [ ] Checked at 320, 390, and 768 px (see `mobile-testing-checklist.md`)
- [ ] Works with the keyboard alone
- [ ] PR description includes: what changed, migration notes (if any), **screenshots on phone and desktop**, tests, and how it was verified
- [ ] Screenshots and test data are **made up**; no real customer names, addresses, phones, or photos
- [ ] Approval from someone other than the author (money, login, and permissions changes need a backend reviewer)
- [ ] AI-assisted code is explained in the PR and the author can explain every line

## 8. Open questions

- Do we add the missing tokens (muted text, success, focus ring)? Who owns `index.css`?
- How do decimal amounts arrive from the API (string or number)?
- Icon set, if any (needs team agreement).
- Are the root-level HTML pages (`job-intake.html`, etc.) early mockups to be retired? (Assumption — confirm with Brad.)

---

*Change log:* v0.2 — aligned with ARCHITECTURE, CONTRIBUTING, DATA_MODEL, `index.css` and `package.json`. v0.1 — initial draft.


# Frontend Conventions

**Ticket:** SCRUM-24 · **Owner:** Fernanda · **Status:** Draft v0.1 — review with the team

These rules keep every screen consistent and let anyone build a new one without asking. They apply to today's HTML + Tailwind pages and to React components once we migrate. If a rule here conflicts with what you need, change the rule in a pull request instead of working around it.

---

## 1. Components

- **One component per file.** File and component names use `PascalCase` (`EstimateTable.jsx`). Plain HTML pages use `kebab-case` (`job-intake.html`).
- **Group by role, not by page:**
  - `components/` reusable pieces (Button, Field, Card, Table)
  - `pages/` one file per screen, mostly composition
  - `i18n/` language files (see SCRUM-26)
- **Build it once, reuse it.** If a button, field, or card appears on a second page, move it to `components/`. Do not copy and paste markup.
- **Small and predictable.** A component takes data through props and does one job. If it grows past about 150 lines, split it.
- **No hard-coded visible text.** Every label, button, message, and placeholder comes from the language files so English and Spanish both work.
- **No hard-coded money logic in the UI.** Store amounts as integer cents. Format only at display time with `Intl.NumberFormat`.
- **Names describe purpose:** `ApproveEstimateButton`, not `Button2`.

## 2. Design tokens

A token is a named value (color, spacing, font) defined once. **Nobody writes a raw hex color, pixel size, or font name in a page or component.** Use the token.

Tokens live in `src/input.css` using Tailwind v4's `@theme`:

```css
@import "tailwindcss";

@theme {
  /* Colors — semantic names, not literal ones */
  --color-surface: #FFFFFF;       /* page background */
  --color-surface-alt: #F1F5F9;   /* cards, table stripes */
  --color-ink: #1E293B;           /* body text */
  --color-ink-muted: #64748B;     /* secondary text */
  --color-line: #CBD5E1;          /* borders, dividers */
  --color-brand: #1F3B34;         /* primary buttons, links */
  --color-brand-ink: #F8FAFC;     /* text on brand */
  --color-danger: #B91C1C;
  --color-success: #15803D;

  /* Type */
  --font-body: "Inter", system-ui, sans-serif;
  --font-display: "Inter", system-ui, sans-serif;

  /* Radius */
  --radius-control: 0.375rem;
}
```

> **TO CONFIRM:** the values above are proposed placeholders based on the current slate look. Agree on the real palette and fonts with Ivan (PO) and update this block. The **names** are what matter.

**Spacing:** use Tailwind's scale (`p-4`, `gap-6`). Do not invent pixel values like `p-[13px]`.

**Dark mode:** not in scope for MVP. If added later, redefine the same tokens, not the components.

## 3. Breakpoints

We design **mobile first**: write the phone layout first, then add rules for larger screens with `sm:`, `md:`, `lg:`.

| Name | Min width | Typical device | What changes |
|------|-----------|----------------|--------------|
| (base) | 0 | Phone, 320–639 px | Single column, stacked fields, full-width buttons |
| `sm` | 640 px | Large phone / small tablet | Two-column forms where useful |
| `md` | 768 px | Tablet | Side-by-side summary and details |
| `lg` | 1024 px | Laptop | Full table layouts, sidebars |

These are Tailwind's defaults. Do not redefine them without team agreement.

**Smallest supported width: 320 px.** Nothing may need horizontal scrolling of the whole page at that width.

## 4. Quality rules (every screen)

**Touch and input**
- Buttons and tap targets are at least **44 × 44 px**, with space between neighbors.
- Text inputs use **16 px or larger** (smaller makes iPhones zoom the page on focus).
- Use the right input type and `inputmode` (`type="email"`, `inputmode="decimal"` for money and quantities).
- Every field has a visible `<label>`. A placeholder is not a label.

**Layout**
- No whole-page horizontal scroll. Wide tables scroll **inside** their own container (`overflow-x-auto`).
- Leave room for translated text: Spanish runs about 20–30% longer than English. Do not fix widths on buttons or labels.
- Images and media use `max-w-full`.
- Respect device safe areas (notches, home bar) on full-bleed layouts.

**Accessibility**
- Text contrast of at least 4.5:1 against its background.
- Visible keyboard focus on every interactive element. Never remove the outline without replacing it.
- Use real elements: `<button>` for actions, `<a>` for navigation, headings in order (`h1` → `h2` → `h3`).
- Set `<html lang>` to the active language.
- Status is never shown by color alone (add text or an icon).

**Safety**
- Never insert user-typed text as raw HTML. Render it as text or escape it.
- Documents that are approved or signed are **read-only in the UI** (use `disabled`/`readonly`, not only CSS) and the server must also reject edits.

## 5. Pull request checklist

Before requesting review:

- [ ] No raw colors, fonts, or one-off pixel sizes — tokens only
- [ ] No hard-coded visible text — language files only
- [ ] Checked at 320, 390, and 768 px (see `mobile-testing-checklist.md`)
- [ ] Works with the keyboard alone
- [ ] No new console errors
- [ ] Ticket key in branch name and PR title (e.g. `SCRUM-24-frontend-conventions`)

## 6. Open questions

- Final palette and fonts (needs PO decision)
- Do we ship React components or stay with static HTML for MVP? (affects section 1)
- Icon set to use, if any

---

*Change log:* v0.1 — initial draft.


# Mobile Width Testing & UI Checklist

**Ticket:** SCRUM-25 · **Owner:** Fernanda · **Status:** Draft v0.2 · **Rules being checked:** `frontend-conventions.md`

Run this on every screen before opening a UI pull request (CONTRIBUTING asks for phone and desktop screenshots), and once across the whole app before each demo.

---

## 1. Setup

Run the React app (not the root HTML pages):

```bash
cd frontend
npm install        # first time only
npm run dev -- --host
```

Vite prints a **Local** and a **Network** address. Open **Local** on your computer and **Network** on a phone connected to the **same Wi-Fi**.

Pages that call the API (`/api/...`) need the Django backend running too. Start it as described in the README or `docs/DEPLOYMENT.md`. If the backend is off, the page may load but show errors; note that in your report instead of marking a layout failure.

**Use made-up data only.** Never test or take screenshots with real customer names, addresses, phone numbers, or photos (CONTRIBUTING, AI_GUIDELINES rule 6).

## 2. How to test

**A. Browser (fast, every change)**
1. Open the page in Chrome → `Cmd+Opt+I` (Mac) / `F12` (Windows).
2. Toggle the device toolbar (`Cmd+Shift+M` / `Ctrl+Shift+M`).
3. Test each width: **320, 360, 390, 414, 768, 1024**.
4. Rotate to landscape at 390 and 768.

**B. Real phone (before demos and releases)**
1. Open the Network address.
2. Test with the on-screen keyboard open.
3. Test with one hand, and outdoors if you can (glare and gloves are real conditions for our users).

**C. Language**
Repeat A and B in **Spanish** (longer text breaks layouts first). Use the language selector once it exists (SCRUM-26).

## 3. Checklist

Mark each cell: ✅ pass · ❌ fail (log a ticket) · — not applicable (or page not built yet).

Screens that exist today: **Intake** (`IntakePage.jsx`) and the shared **AppShell**. Add columns as pages are built (estimate, proposal, work orders, projects).

| # | Check | AppShell | Intake | (next page) |
|---|-------|:---:|:---:|:---:|
| 1 | No whole-page horizontal scroll at 320 px | | | |
| 2 | Wide tables scroll inside their own container | | | |
| 3 | Buttons and tap targets are at least 44 px, with spacing | | | |
| 4 | Input text is 16 px or larger (no zoom on focus in iPhone) | | | |
| 5 | Every field has a visible label | | | |
| 6 | Right keyboard shows (email, tel, decimal) | | | |
| 7 | On-screen keyboard does not hide the main button or the active field | | | |
| 8 | Text is not cut off, overlapping, or stuck to the edges | | | |
| 9 | Spanish text fits (buttons, labels, headers) | | | |
| 10 | Landscape works | | | |
| 11 | Images and media stay inside the screen | | | |
| 12 | Primary action is reachable without zooming | | | |
| 13 | Keyboard only: Tab reaches everything and focus is visible | | | |
| 14 | Contrast is readable (text and buttons) | | | |
| 15 | Approved / signed content cannot be edited in the UI | | | |
| 16 | Empty state, long text, and large numbers do not break the layout | | | |
| 17 | Uses shared tokens (`bg-brand`, `text-ink`, `border-line`), no raw colors | | | |
| 18 | No hard-coded text: every string has English and Spanish keys | | | |
| 19 | No errors in the browser console | | | |

### Widths tested

| Width | Page(s) | Date | Tester |
|-------|---------|------|--------|
| 320 | | | |
| 390 | | | |
| 414 | | | |
| 768 | | | |
| 1024 | | | |
| Real phone (model: ____ ) | | | |

## 4. Quick stress tests (made-up data)

- Name with accents and symbols: `Jose O'Brien <b>test</b>` (it must show as text, never as formatting)
- A 60-character client name with no spaces
- Quantity `0`, `0.5`, `99999`
- Price with many decimals: `12.345`
- Double-tap the main button quickly (does it submit twice?)
- Change language in the middle of filling a form
- Reload mid-form (what is lost?)
- Turn off Wi-Fi, then press save (is there a clear message?)
- Backend off: does the page show a helpful error instead of a blank screen?

## 5. Reporting a failure

Create a ticket for each failure:

```
Title: [Screen] short description at [width] px
Page / URL:
Width / device:
Language: EN / ES
Steps to reproduce:
  1.
  2.
Expected:
Actual:
Screenshot: (attach, made-up data only)
Rule broken: (e.g., "Tap targets at least 44 px")
Priority: High (blocks use) / Medium / Low (cosmetic)
```

**Priority guide**
- **High:** a user cannot complete a task (button hidden by keyboard, form unusable).
- **Medium:** hard to use but possible (small targets, cut-off text).
- **Low:** cosmetic.

## 6. Done criteria for this checklist

- [ ] Run on every page that exists, at 320, 390, and 768 px
- [ ] Run on at least one real phone
- [ ] Run once in Spanish
- [ ] Every ❌ has a ticket or a fix
- [ ] Results saved in this file (or linked screenshots with made-up data) and committed

---

*Change log:* v0.2 — setup changed to the Vite app, columns match existing pages, added token and i18n checks. v0.1 — initial draft.


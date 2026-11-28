# Mobile Width Testing & UI Checklist

**Ticket:** SCRUM-25 · **Owner:** Fernanda · **Rules being checked:** `frontend-conventions.md`

Run this on every screen before merging UI changes, and once across the whole app before each demo.

---

## 1. Setup

```bash
# Terminal 1: keep Tailwind building
npm run build:css

# Terminal 2: serve the pages
npx serve .
```

`serve` prints a **Network** address (for example `http://192.168.x.x:PORT`). Open that on a real phone connected to the **same Wi-Fi**.

## 2. How to test

**A. Browser (fast, every change)**
1. Open the page in Chrome → `Cmd+Opt+I` (Mac) / `F12` (Windows).
2. Toggle the device toolbar (`Cmd+Shift+M` / `Ctrl+Shift+M`).
3. Test each width: **320, 360, 390, 414, 768, 1024**.
4. Rotate to landscape at 390 and 768.

**B. Real phone (before demos and releases)**
1. Open the Network address.
2. Test with the on-screen keyboard open.
3. Test with one hand, outdoors if you can (glare and gloves are our real users).

**C. Language**
Repeat steps A–B with the language set to **Spanish** (longer text breaks layouts first).

## 3. Checklist

Mark each cell: ✅ pass · ❌ fail (log a ticket) · — not applicable.

### Rules per screen

| # | Check | job-intake | estimate | proposal | projects | work-orders |
|---|-------|:---:|:---:|:---:|:---:|:---:|
| 1 | No whole-page horizontal scroll at 320 px | | | | | |
| 2 | Wide tables scroll inside their own container | | | | | |
| 3 | Buttons and tap targets are at least 44 px, with spacing | | | | | |
| 4 | Input text is 16 px or larger (no zoom on focus in iPhone) | | | | | |
| 5 | Every field has a visible label | | | | | |
| 6 | Right keyboard shows (email, number, decimal) | | | | | |
| 7 | On-screen keyboard does not hide the main button or the field being typed | | | | | |
| 8 | Text is not cut off, overlapping, or stuck to edges | | | | | |
| 9 | Spanish text fits (buttons, labels, table headers) | | | | | |
| 10 | Landscape works | | | | | |
| 11 | Images and media stay inside the screen | | | | | |
| 12 | Primary action is reachable without zooming or pinching | | | | | |
| 13 | Keyboard-only: Tab reaches everything, focus is visible | | | | | |
| 14 | Contrast is readable (text and buttons) | | | | | |
| 15 | Approved / signed content cannot be edited (fields disabled) | | | | | |
| 16 | Empty state, long text, and large numbers do not break layout | | | | | |
| 17 | No errors in the browser console | | | | | |

### Widths tested

| Width | Page(s) | Date | Tester |
|-------|---------|------|--------|
| 320 | | | |
| 390 | | | |
| 414 | | | |
| 768 | | | |
| 1024 | | | |
| Real phone (model: ____ ) | | | |

## 4. Quick stress tests

Try these on forms; they find most hidden bugs:

- Name with accents and symbols: `José O'Brien <b>test</b>`
- A 60-character client name with no spaces
- Quantity `0`, `0.5`, `99999`
- Price with many decimals: `12.345`
- Double-tap the main button quickly
- Change the language in the middle of filling a form
- Reload mid-form (what is lost?)
- Turn off Wi-Fi, then press save (is there a clear message?)

## 5. Reporting a failure

Create a Jira ticket for each failure using this template:

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
Screenshot: (attach)
Rule broken: (e.g., "Tap targets at least 44 px")
Priority: High (blocks use) / Medium / Low (cosmetic)
```

**Priority guide**
- **High:** a user cannot complete a task (button hidden by keyboard, form unusable).
- **Medium:** hard to use but possible (small targets, cut-off text).
- **Low:** cosmetic.

## 6. Done criteria for this checklist

- [ ] Run on all five pages at 320, 390, and 768 px
- [ ] Run on at least one real phone
- [ ] Run once in Spanish
- [ ] Every ❌ has a ticket or a fix
- [ ] Results saved in this file (or linked screenshots) and committed

---

*Change log:* v0.1 — initial draft.

# LearnEase UI (React + Tailwind)

Notebook-style UI built from the Figma file "LearnEase – Notebook UI". Light and dark themes, three layouts
(mobile < 768px, tablet 768–1023px, desktop ≥ 1024px).

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

## Stack

- React 18 + Vite, React Router (`/`, `/library`, `/login`, `/signup`)
- Tailwind CSS 3, colors mapped to CSS variables, so light/dark is one `data-theme` switch
- Radix UI (Dialog, Tabs) for the Add content modal / bottom sheet and the Link / Text / Images switch
- Fonts self-hosted via Fontsource: Fraunces (headings), Inter (UI), Caveat (handwriting)

## Where things are

- `src/index.css`: design tokens (`:root` = light, `[data-theme='dark']`), ruled paper, index-card lines
- `tailwind.config.js`: token-to-Tailwind color map, fonts, shadow, auto line-height font sizes
- `src/theme.jsx`: theme provider (system default, saved choice, toggles `data-theme`)
- `src/components/ScopePicker.jsx`: flash scope. Chips for up to 3 subjects (`MAX_CHIPS`), a dropdown beyond that
- `src/components/`: `ui.jsx` (Button, Chip, Pill, Field, Sticky, Holes, ThemeToggle), `Shell.jsx` (header, mobile tab bar, margin line), `AddContent.jsx`
- `src/pages/`: `Dashboard.jsx`, `Library.jsx`, `Auth.jsx` (login and signup)
- `src/data.js`: sample data. Replace with your API.

## Wire-up points (marked TODO in code)

- `AddContent.jsx` submit: send the link / text / images to your backend
- `Auth.jsx`: email form submit and Google OAuth button
- `Dashboard.jsx`: replace `CARDS` with LLM-generated cards; saved cards persist via your API

## Not in the Figma file (added so the UI works)

- Show answer / Hide answer reveals the answer in the card; Save toggles the bookmark and fills the Saved flashcards notes
- Library: subject switching and search; Add content: Text and Images panels; the subject picker is a real select
- Dashboard "card 3 this session" starts at 3 to match the design; start at 1 in production
- Desktop login/signup have no red margin line, matching the Figma frames

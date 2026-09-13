# Visual Typing Speed Tester

A typing speed test built with React, TypeScript, and Vite. Type against
random words or real text excerpts, in either a timed or completion-based
mode, and see live stats as you go.

## Features

- **Two test modes**
  - **Timed** — type for as long as the clock runs. Text is generated in
    chunks and silently extended as you approach the end, so you never hit
    a hard stop before time's up.
  - **Completion** — type until you finish a fixed amount of content
    (scalable by a length multiplier), then the test ends automatically.
- **Two content sources**
  - **Random Words** — pulled from a word bank.
  - **Text Excerpt** — real passages, one random excerpt (or several lines,
    depending on mode) pulled per test.
- **Live stats while typing**
  - WPM (words per minute)
  - Accuracy percentage
  - Mistake count, plus a left/right breakdown of remaining mistakes
  - Words written / words remaining (label switches depending on mode)
  - Clock — counts down in Timed mode, counts up in Completion mode
- **Results page** — test completion navigates to a dedicated `ResultsPage`
  (replacing the old `ResultsModal`), showing final WPM, time, mistakes,
  and accuracy, with options to restart or return home, plus two graphs:
  - **Mistakes over time** — where in the test mistakes happened.
  - **Most mistyped characters** — which characters trip you up most.
- **Responsive layout** — stat rows use CSS Grid/Flexbox with no fixed
  minimum widths, so the interface scales down to phone-width screens
  without overflowing or overlapping. The stat area is sticky, so it stays
  visible above the on-screen keyboard while typing on mobile.
- **Mobile typing support** — typing works correctly with on-screen mobile
  keyboards (handles the `"Unidentified"` key-reporting quirk some mobile
  browsers have), and auto-capitalization of the first typed character is
  disabled so it doesn't fight against lowercase test content.
- **Light Mode / Dark Mode** — sticky, visual sliding toggle (a switch,
  not a plain button) in the top-right corner, visible on every page.
  Built with CSS custom properties (no theming library): a light and dark
  palette are each defined once in `theme.css`, and every component reads
  its colors from those shared variables instead of hardcoding them. Your
  choice is saved to `localStorage`, so it's remembered across page
  reloads and future visits.
- **Mechanical keyboard sound** — a synthesized click plays on every
  keystroke while typing (no audio files — generated on the fly with the
  Web Audio API), with a distinct lower/harsher tone for mistakes versus
  correct keystrokes. Toggleable via a sticky speaker button next to the
  theme toggle; the choice is remembered across reloads the same way the
  theme is.

## Tech stack

- **React + TypeScript**, scaffolded with **Vite**
- **React Router** (`react-router-dom`) for client-side routing between the
  landing page and the test page
- **React Compiler** — enabled; note that it flags impure calls
  (`Date.now()`, `Math.random()`) written directly in component/hook
  bodies, even when only called from event handlers. See `useTypingEngine.ts`
  for the established workaround pattern (wrap the call in a small
  module-scope helper function). The same pattern is reused in `useSound.ts`
  for its `AudioContext`/oscillator calls.
- **Theming** — plain CSS custom properties (`--color-*` variables) toggled
  via a `data-theme` attribute on `<html>`, managed by a small `useTheme`
  hook. No CSS-in-JS or theming library involved.
- **Sound** — synthesized in-browser via the Web Audio API (`useSound`
  hook); no audio asset files or sound libraries.
- Deployed on **Vercel**, with a rewrite rule in `vercel.json` so
  client-side routes (e.g. `/test`) don't 404 on direct navigation/refresh.

## Getting started

```bash
npm install
npm run dev
```

This starts the Vite dev server (defaults to `http://localhost:5173`).

To test on a phone or another device on your local network without
deploying:

```bash
npm run dev -- --host
```

Vite will print a network URL (e.g. `http://192.168.x.x:5173`) — open that
on any device connected to the same Wi-Fi network.

### Build

```bash
npm run build
```

## Project structure

```
src/
├── components/     UI building blocks (counters, buttons, ThemeToggle
│                    (sliding switch), SoundToggle, mistake graphs, etc.)
├── constants/       Shared constants (e.g. base word count)
├── hooks/            Core logic — typing engine, word bank, text loading,
│                      theme state (useTheme), sound (useSound)
├── pages/            LandingPage, TestPage, and ResultsPage (routed views)
├── styles/           App.css and theme.css (light/dark color variables)
├── App.tsx           Router config, renders ThemeToggle and SoundToggle
│                      above all routes
└── main.tsx          App entry point

public/
├── words.txt         Word bank used for Random Words mode
├── text.txt           Text excerpts, one per line (gitignored)

vercel.json           Deployment rewrite rules
```

## Routes

| Route      | Page          | Notes                                              |
|------------|---------------|-----------------------------------------------------|
| `/`        | LandingPage   | Choose test type, content source, and options       |
| `/test`    | TestPage      | Reads `type`, `duration`/`length`, and `content` query params |
| `/results` | ResultsPage   | Shown on test completion; replaces the old `ResultsModal`. Shows final stats plus Mistakes-over-Time and Most-Mistyped-Characters graphs |

## Status

Actively in development. Mobile responsiveness, mobile typing support,
light/dark mode (now a sliding toggle), keyboard sound, the dedicated
results page, and its mistake graphs are complete.

## Roadmap

Planned next, in rough priority order:

- **Leaderboard** — persistent high-score tracking across tests.
  - Needs a decision on storage: purely local (`localStorage`, matching
    the pattern already used for theme/sound preferences) vs. a small
    backend/DB if scores should be shareable across devices or users.
  - Likely filterable by test mode/content source/duration, since WPM
    isn't directly comparable across a 15-second Random Words test and a
    5-minute Text Excerpt test.
  - Would need a new route or a panel on the landing page to display it.

Not yet scheduled, but worth revisiting once the above lands:

- Per-key/finger accuracy stats beyond the current mistyped-characters graph
- Exporting test history/results

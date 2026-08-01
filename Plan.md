# Visual Typing Speed Tester — Feature Ranking

**Project:** Visual Typing Speed Tester (React JS)
**Timeline:** 4 days to MVP

Features ranked by a combination of **importance** (how essential to a working typing-speed-tester experience) and **feasibility** (how realistic to build well in the time available). Rank 1 = build first.

---

## Ranking

### 1. Type random words
**Why first:** This is the core interaction — without it there's no product. It's also the most feasible piece: pull from a static word list (array or small JSON), render it, track keystrokes against it. No external content parsing needed.
**Day estimate:** Day 1

### 2. Visual clock (time taken / countdown)
**Why second:** A typing tester isn't a typing tester without timing. Pick **one** mode for MVP — recommend **count-up (time taken)** paired with the random-words feature, since word count can just be "type until you stop" rather than needing a predetermined excerpt. This is the simplest timing implementation (start on first keystroke, stop on completion/stop action).
**Day estimate:** Day 1–2

### 3. Mistakes counter
**Why third:** Directly builds on #1 — you're already comparing typed characters to target characters, so tracking mismatches is a small incremental addition, not a new system. High value for relatively low extra effort.
**Day estimate:** Day 2

### 4. Light mode / dark mode
**Why fourth:** Cheap to build (CSS variables + a toggle + stored preference in state) and delivers a disproportionate amount of visual polish for a demo. Doesn't depend on any other feature, so it can be slotted in whenever there's a spare hour — but it's ranked here because it's worth doing early rather than as a last-minute scramble.
**Day estimate:** Day 2 (small task, fits in gaps)

### 5. Type a phrase/excerpt from a book
**Why fifth:** Valuable content variety, but it's a second content source and pairs naturally with the countdown/fixed-length version of the clock (predetermined text, variable time) — meaning it duplicates some logic from #1–#2 rather than introducing something essential. Good "if time allows" feature after the core loop works.
**Day estimate:** Day 2–3 (if time permits)

### 6. Logging mistakes / graph of typing speed
**Why sixth:** A natural extension of the mistakes counter (#3) — you already have the data, this is about storing it over time and visualizing it (e.g., with a lightweight chart library like `recharts`). Good demo "wow factor," but it's an enhancement on top of existing data, not a new core mechanic.
**Day estimate:** Day 3 (if time permits)

### 7. Different modes for the player (e.g., type a book page, type with a time limit)
**Why seventh:** This is essentially a wrapper/selector over features 1, 2, and 5 combined. It only makes sense to build once those underlying features exist — building "modes" before the modes have real content behind them is premature structure.
**Day estimate:** Day 3–4 (if time permits)

### 8. Dropdown list of options (one page / two pages / one minute / two minutes)
**Why eighth:** Pure UI/UX polish on top of #7. It's low effort in isolation, but it's not useful until modes exist to select between.
**Day estimate:** Day 4 (if time permits), otherwise defer post-MVP

### 9. Replay of the typing
**Why ninth:** Requires recording a timestamped log of every keystroke (not just the end result) and building a separate playback UI to re-render that sequence. This is a meaningfully different system from the live-typing logic already built, with real edge cases (timing accuracy, pause/scrub controls). High "wow factor" for a demo, but high risk for a 4-day timeline — treat as a post-MVP feature.
**Day estimate:** Not recommended for MVP; revisit after Day 4 if ahead of schedule

### 10. Leaderboard (Firebase)
**Why last:** This is the only feature requiring external infrastructure — a Firebase project, database schema/rules, and (likely) some form of user identification. That's a new category of risk (auth, network calls, security rules, deployment config) on top of everything else, and a broken/half-working backend integration looks worse in a demo than simply not having it. Best treated as a "if the whole app is done early" bonus, not a Day 1–4 commitment.
**Day estimate:** Not recommended for MVP; revisit only if core + stretch goals are complete with time to spare

---

## Core MVP (non-negotiable, must ship)
- Type random words
- Visual clock (pick one variant)
- Mistakes counter

## Stretch Goals (build if time allows, in priority order)
- Light/dark mode
- Book excerpt mode
- Mistakes log / speed graph
- Multiple modes
- Dropdown selector

## Post-MVP / Out of Scope for 4 Days
- Replay of typing — complex playback system, not essential for proving the core concept
- Leaderboard (Firebase) — introduces backend/auth risk disproportionate to a 4-day timeline

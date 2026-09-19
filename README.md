# Hangman Game (Angular)

A responsive, timed Hangman game built with Angular standalone components.
Live Link:https://agent-6aaea267567161cde6dbdcb2--hangmangthb.netlify.app/

## Features

- Random word generation from 5 categories (Programming, Countries, Animals, Movies, Sports)
- 3 difficulty levels (Easy: 4-6 letters, Medium: 7-9 letters, Hard: 10+ letters)
- 7-stage SVG hangman drawing with animations
- 10-second countdown timer per guess (timeout = wrong attempt)
- On-screen keyboard + physical keyboard support
- One-hint-per-game clue system
- LocalStorage statistics (games played/won/lost, win %, best performance)
- Responsive design

## Requirements

Before running, you need:

| Tool | Version | Purpose |
|------|---------|---------|
| Node.js | 18.19+ (includes npm) | JavaScript runtime & package manager |

## Installation Guide

### Step 1 - Install Node.js (includes npm)

**Option A - Official installer (simplest):**
1. Go to https://nodejs.org/en/download
2. Download the **Windows Installer (.msi)** (LTS version recommended)
3. Run the installer and keep clicking **Next** until done
4. Restart your terminal/command prompt

**Option B - Command line (if your laptop has a package manager):**
```bash
# Chocolatey
choco install nodejs-lts

# or winget (built into Windows 10/11)
winget install OpenJS.NodeJS.LTS
```

### Step 2 - Verify Node.js and npm

Open a terminal (Command Prompt or PowerShell) and run:

```bash
node --version
npm --version
```

You should see version numbers like `v22.x.x` for Node and `11.x.x` for npm.
(No need to install "Angular" globally - the project's dependencies include it.)

### Step 3 - Extract the project

1. Extract this zip to your preferred folder (e.g. `C:\hangman`)
2. Open a terminal **inside** that folder:
   ```bash
   cd C:\hangman\hangman-game
   ```

### Step 4 - Install project dependencies

```bash
npm install
```

This downloads all packages listed in `package.json` into a `node_modules` folder.
Takes 1-5 minutes on first run.

### Step 5 - Start the game

```bash
npm start
```

You'll see output ending with something like:

```
** Angular Live Development Server is listening on localhost:4200 **
```

### Step 6 - Play

Open your browser and go to: **http://localhost:4200**

## Build for Production

To generate a static production build in `dist/`:

```bash
npm run build
```

You can deploy the `dist/hangman-game` folder to any static web host.

## Project Structure

```
hangman-game/
├─ src/
│  ├─ app/
│  │  ├─ components/
│  │  │  ├─ start-screen/      # Start menu, category/difficulty selectors
│  │  │  ├─ game/              # Main game layout & logic
│  │  │  ├─ word-display/      # Hidden word & letter reveal
│  │  │  ├─ keyboard/          # On-screen A-Z keyboard
│  │  │  ├─ timer/             # 10-second countdown ring
│  │  │  ├─ hangman-drawing/   # SVG 7-stage drawing
│  │  │  ├─ result-modal/      # Win/Lose overlay
│  │  │  └─ stats/             # Statistics card
│  │  ├─ data/words.ts         # All words, categories & hints
│  │  ├─ models/               # Word, GameState, Statistics types
│  │  └─ services/             # Word, Game, Statistics services
│  ├─ index.html
│  ├─ main.ts
│  └─ styles.css
├─ angular.json
└─ package.json
```

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `npm is not recognized` | Node.js not installed or terminal not restarted |
| `Cannot find module '@angular/...'` | Run `npm install` in the project folder |
| Port 4200 already in use | Run `npm start -- --port 4201` instead |
| Build errors about missing pipes | Re-extract the zip; source files are missing |

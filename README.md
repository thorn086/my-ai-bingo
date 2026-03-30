# Bingo Mixer

Bingo Mixer is a lightweight social bingo app for in-person events, workshops, and team mixers.

Instead of generic icebreakers, players move around the room, find people who match each square, and race to complete five in a row.

[Start the workshop](workshop/GUIDE.md) · [Jump into setup](workshop/01-setup.md)

---

## Why This Project Exists

This repository does two jobs:

1. It ships a polished React + TypeScript bingo game.
2. It acts as a hands-on workshop for building with GitHub Copilot, custom agents, and iterative design workflows.

If you want a playable app, run it locally.
If you want the learning path behind it, follow the workshop.

---

## What You Get

- A responsive bingo experience designed for real-world social mixers
- Randomized bingo boards with a free center square
- Win detection with highlighted winning lines
- A workshop flow that walks through setup, design, prompt engineering, and multi-agent collaboration
- A clean Vite + React + TypeScript codebase that is easy to extend

---

## Choose Your Path

### Play Or Build The App

Use this path if you want to run the project, inspect the code, or customize the game for your own event.

### Follow The Workshop

Use this path if you want to learn how the project was built and how to use Copilot more deliberately.

| Part | Focus |
|------|-------|
| [00](workshop/00-overview.md) | Overview and workshop checklist |
| [01](workshop/01-setup.md) | Setup and context engineering |
| [02](workshop/02-design.md) | Design-first frontend workflow |
| [03](workshop/03-quiz-master.md) | Custom Quiz Master prompts |
| [04](workshop/04-multi-agent.md) | Multi-agent development patterns |
| [05](workshop/05-complete.md) | Wrap-up and final state |

Workshop files are also available in the [workshop](workshop/) folder for local reading.

---

## Quick Start

### Prerequisites

- [Node.js 22](https://nodejs.org/) or later

### Run Locally

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

### Quality Checks

```bash
npm run lint
npm test
npm run build
```

---

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- ESLint
- Vitest

---

## Project Shape

```text
src/
	components/   UI building blocks and screens
	data/         Bingo prompts and content
	hooks/        Game state management
	types/        Shared domain types
	utils/        Board generation and bingo logic
workshop/       Guided lab content
docs/           Static workshop support files
```

---

## Dev Containers And Codespaces

This repository already includes a `.devcontainer/devcontainer.json`.

- GitHub Codespaces: create a Codespace from your own fork or repository and the container will boot automatically.
- VS Code Dev Containers: clone locally, then run `Dev Containers: Reopen in Container`.
- GitHub Pages: publishing is set up for use from your own repository.

---

## Adapting It For Your Event

This project is intentionally small, so it is easy to remix.

- Replace the prompts in `src/data/questions.ts`
- Adjust the visual language in `src/index.css`
- Extend the workshop for your own class or internal training

---

## Deployment

Production builds are generated with:

```bash
npm run build
```

The repository is set up for GitHub Pages deployment from `main`.

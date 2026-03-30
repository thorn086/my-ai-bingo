---
description: React + TypeScript conventions for the Bingo Mixer project
---

# React + TypeScript Development Conventions

## Mandatory Pre-completion Checklist

Before finishing any task involving code changes, verify:

- [ ] **Lint** — `npm run lint` passes with no errors
- [ ] **Build** — `npm run build` succeeds
- [ ] **Test** — `npm test` passes

---

## Quick Reference

| Pattern | Rule |
|---|---|
| Component exports | Named `export function` — never `export default` |
| Props types | `interface XxxProps` directly above component, destructured in signature |
| Type imports | `import type { ... }` for type-only imports |
| Domain types | All live in `src/types/index.ts` |
| Hook return | Flat object merging state + actions |
| Utilities | Pure functions in `src/utils/`, JSDoc on non-obvious ones |
| Constants | `UPPER_SNAKE_CASE` |
| External state | Validate with a type guard before using |
| Accessibility | `aria-pressed`, `aria-label`, `role` on all interactive elements |
| Styling | Tailwind v4 `@theme` tokens — no raw color values in JSX |

---

## Component Exports

Always use named exports. Never `export default`.

```tsx
// ✅
export function BingoBoard({ board, onSquareClick }: BingoBoardProps) { ... }

// ❌
export default function BingoBoard(...) { ... }
```

## Props Types

Inline `interface XxxProps` directly above the component; destructure in the signature.

```tsx
interface BingoBoardProps {
  board: BingoSquareData[];
  winningSquareIds: Set<number>;
  onSquareClick: (squareId: number) => void;
}

export function BingoBoard({ board, winningSquareIds, onSquareClick }: BingoBoardProps) { ... }
```

## Type Imports

```tsx
import { useBingoGame } from './hooks/useBingoGame';
import type { BingoSquareData, GameState } from '../types';
```

All domain types (`BingoSquareData`, `BingoLine`, `GameState`) live in `src/types/index.ts`.

## Custom Hooks

Return a flat object merging state + actions:

```tsx
export function useBingoGame(): BingoGameState & BingoGameActions {
  // ...
  return { gameState, board, winningSquareIds, startGame, resetGame, dismissModal };
}
```

## Utilities

Pure functions in `src/utils/`. Return new objects/arrays (immutable). Add JSDoc on non-obvious functions.

```tsx
/** Toggle a square's marked state */
export function toggleSquare(board: BingoSquareData[], squareId: number): BingoSquareData[] {
  return board.map((sq) =>
    sq.id === squareId && !sq.isFreeSpace ? { ...sq, isMarked: !sq.isMarked } : sq
  );
}
```

## Accessibility

All interactive elements need `aria-*` attributes:

```tsx
<button aria-pressed={square.isMarked} aria-label={square.text} onClick={onClick}>
  {square.text}
</button>
```

## External State Validation

Use a type guard before consuming data from localStorage or other external sources:

```tsx
function validateStoredData(data: unknown): data is StoredGameData {
  if (!data || typeof data !== 'object') return false;
  // ... field checks
  return true;
}
```

## Styling

Define tokens in `src/index.css` via `@theme`, then use them as Tailwind classes:

```css
@theme {
  --color-accent: #2563eb;
  --color-marked: #dcfce7;
}
```

```tsx
<div className="bg-accent border-marked">...</div>
```

See `.github/instructions/tailwind-4.instructions.md` for full Tailwind v4 patterns.

## Design Guide

Use the existing visual system before introducing new styles. This app now follows a premium dark UI with Apple-style spacing and layout discipline.

### Visual Direction

- Prefer deep navy and graphite surfaces over pure black or flat gray backgrounds.
- Use vibrant accents sparingly: cyan for primary action, indigo for active states, electric green for success or completed bingo states.
- Keep layouts calm and spacious. Favor generous padding, strong alignment, and clear hierarchy over dense ornamentation.
- Preserve the current premium tone: polished, restrained, high-contrast, and modern rather than playful or loud.

### Reusable Surface Classes

When possible, compose from the shared classes in `src/index.css` instead of inventing one-off panel styles:

- `app-shell` for full-screen page backgrounds
- `frosted-panel` for header and elevated glass surfaces
- `product-panel` for feature cards and secondary content blocks
- `primary-button` and `secondary-button` for core actions
- `status-banner` and `status-banner-success` for neutral and success messaging
- `board-frame`, `square-surface`, `square-surface-active`, `square-surface-winning`, and `square-surface-free` for bingo board states

### Color And State Rules

- Do not hardcode raw color utilities in JSX for new UI unless there is a strong reason; prefer semantic tokens and shared classes.
- Reserve the brightest accent treatment for the primary CTA and high-signal interaction moments.
- Winning states must remain visually distinct from merely marked states.
- Free-space styling should stay quieter than winning or active states while remaining clearly identifiable.

### Typography And Spacing

- Stay on the existing San Francisco-style system font stack defined in `src/index.css`.
- Use tight tracking only for large display headlines and uppercase labels.
- Prefer short, product-like copy blocks over long explanatory paragraphs.
- On mobile, preserve breathing room around cards, headers, and the board; do not compress spacing aggressively to fit more content.

### Motion And Effects

- Keep animation restrained and purposeful.
- Favor subtle blur, gradients, and depth over heavy glow or constant motion.
- If a celebratory or active state needs emphasis, use a single clear highlight rather than stacking multiple visual effects.

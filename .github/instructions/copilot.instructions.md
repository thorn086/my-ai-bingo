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

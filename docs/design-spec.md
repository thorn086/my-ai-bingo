# Design Spec

## Iteration 1: Card Deck Shuffle

- Goal: replace the bingo-board mental model with a single-card draw flow where the first tap immediately reveals a prompt.
- Entry behavior: the primary CTA on the start screen starts the round and draws the first random card in the same action.
- Core play screen: keep one dominant question card on screen, with a visible deck stack that doubles as the redraw control.
- Visual direction: preserve the premium dark glass system, but shift imagery from grids and completion states to layered cards and singular focus.
- Host behavior: optimize for device handoff between players rather than persistent board management.

## Iteration 2: Dual Mode Entry

- Goal: keep the new card flow without deleting the original bingo experience.
- Entry behavior: the landing screen exposes two clear play modes, with preview content updating to match the selected mode before launch.
- Bingo path: restore the original 5x5 board, progress tracking, and bingo celebration modal.
- Card path: preserve the instant-reveal deck interaction introduced in iteration 1.
- Product framing: position the app as one mixer tool with two social play styles rather than a single permanent replacement.
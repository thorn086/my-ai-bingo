import type { BingoSquareData } from '../types';
import { BingoBoard } from './BingoBoard';

interface GameScreenProps {
  board: BingoSquareData[];
  winningSquareIds: Set<number>;
  hasBingo: boolean;
  onSquareClick: (squareId: number) => void;
  onReset: () => void;
}

export function GameScreen({
  board,
  winningSquareIds,
  hasBingo,
  onSquareClick,
  onReset,
}: GameScreenProps) {
  const markedCount = board.filter((square) => square.isMarked && !square.isFreeSpace).length;

  return (
    <div className="app-shell min-h-screen px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-6xl flex-col gap-4 sm:min-h-[calc(100vh-3rem)]">
        <header className="frosted-panel rounded-4xl px-4 py-4 sm:px-5 lg:px-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center justify-between gap-3">
              <button onClick={onReset} className="secondary-button" aria-label="Return to game selection screen">
                Back
              </button>
              <span className="eyebrow-label">Live board</span>
            </div>

            <div className="lg:text-center">
              <h1 className="text-2xl font-semibold tracking-[-0.05em] text-text-primary sm:text-3xl">
                Bingo Mixer
              </h1>
              <p className="mt-1 text-sm text-text-secondary">
                Mark each prompt as soon as you find a match in the room.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 lg:min-w-[16rem]">
              <div className="quiet-stat">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-text-tertiary">Progress</p>
                <p className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-text-primary">{markedCount}</p>
              </div>
              <div className="quiet-stat">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-text-tertiary">Target</p>
                <p className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-text-primary">5 in a row</p>
              </div>
            </div>
          </div>
        </header>

        <div className="grid flex-1 gap-4 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
          <section className="order-2 lg:order-1">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <div className="status-banner">
                Tap a square each time someone matches the prompt.
              </div>
              {hasBingo && (
                <div className="status-banner-success">
                  Bingo complete. Keep exploring or start a fresh board.
                </div>
              )}
            </div>

            <BingoBoard
              board={board}
              winningSquareIds={winningSquareIds}
              onSquareClick={onSquareClick}
            />
          </section>

          <aside className="order-1 space-y-4 lg:order-2">
            <div className="product-panel rounded-4xl p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-tertiary">Play guidance</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-text-primary">
                Keep the interaction natural.
              </h2>
              <p className="mt-3 text-sm leading-6 text-text-secondary">
                Use the prompts as conversation starters, not a script. The board works best when the room feels relaxed.
              </p>
              <div className="mt-5 space-y-3">
                <div className="quiet-stat">
                  <p className="text-sm font-medium text-text-primary">Look for easy openings</p>
                  <p className="mt-1 text-sm leading-6 text-text-secondary">Start with prompts that are obvious from a quick conversation.</p>
                </div>
                <div className="quiet-stat">
                  <p className="text-sm font-medium text-text-primary">Watch for a line</p>
                  <p className="mt-1 text-sm leading-6 text-text-secondary">Rows, columns, and diagonals all count toward the win state.</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

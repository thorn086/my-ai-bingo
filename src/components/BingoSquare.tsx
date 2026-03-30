import type { BingoSquareData } from '../types';

interface BingoSquareProps {
  square: BingoSquareData;
  isWinning: boolean;
  onClick: () => void;
}

export function BingoSquare({ square, isWinning, onClick }: BingoSquareProps) {
  const baseClasses =
    'relative flex min-h-[68px] items-center justify-center overflow-hidden rounded-[1.35rem] px-2 py-2 text-center text-[0.68rem] leading-[1.2] font-medium tracking-[-0.02em] transition-all duration-200 select-none sm:min-h-[84px] sm:px-3 sm:text-[0.8rem]';

  const stateClasses = square.isMarked
    ? isWinning
      ? 'square-surface-winning text-square-winning-text'
      : 'square-surface-active text-square-marked-text'
    : 'square-surface text-text-secondary';

  const freeSpaceClasses = square.isFreeSpace
    ? 'square-surface-free text-sm font-semibold text-text-primary sm:text-base'
    : '';

  const disabledClasses = square.isFreeSpace ? 'cursor-default' : 'hover:-translate-y-0.5 active:translate-y-0';

  return (
    <button
      onClick={onClick}
      disabled={square.isFreeSpace}
      className={`${baseClasses} ${stateClasses} ${freeSpaceClasses} ${disabledClasses}`}
      aria-pressed={square.isMarked}
      aria-label={square.isFreeSpace ? 'Free space' : square.text}
    >
      {square.isFreeSpace && (
        <span className="absolute inset-x-3 top-2 text-[0.55rem] font-semibold uppercase tracking-[0.22em] text-text-tertiary sm:top-3">
          Free
        </span>
      )}
      <span className="wrap-break-word hyphens-auto">{square.text}</span>
      {square.isMarked && !square.isFreeSpace && (
        <span
          className={isWinning ? 'absolute right-2 top-2 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-text-primary sm:right-2.5 sm:top-2.5' : 'absolute right-2 top-2 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-text-inverse/80 sm:right-2.5 sm:top-2.5'}
        >
          Done
        </span>
      )}
    </button>
  );
}

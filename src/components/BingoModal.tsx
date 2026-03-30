interface BingoModalProps {
  onDismiss: () => void;
}

export function BingoModal({ onDismiss }: BingoModalProps) {
  return (
    <div className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="modal-card w-full max-w-sm rounded-4xl p-6 text-center animate-[modal-rise_260ms_ease-out] sm:p-8">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-surface text-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.88),0_18px_40px_rgba(17,17,17,0.12)]">
          ✓
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-text-tertiary">Line complete</p>
        <h2 className="mt-3 text-4xl font-semibold tracking-[-0.06em] text-text-primary">Bingo</h2>
        <p className="mt-3 text-sm leading-6 text-text-secondary">
          You completed a full line. Keep the conversation going or reset for another round.
        </p>

        <button
          onClick={onDismiss}
          className="primary-button mt-7 w-full"
          aria-label="Dismiss bingo celebration"
        >
          Keep Playing
        </button>
      </div>
    </div>
  );
}

interface CardGameScreenProps {
  currentQuestion: string | null;
  remainingQuestions: number;
  totalQuestionCount: number;
  onDrawNext: () => void;
  onReset: () => void;
}

export function CardGameScreen({
  currentQuestion,
  remainingQuestions,
  totalQuestionCount,
  onDrawNext,
  onReset,
}: CardGameScreenProps) {
  const drawnCount = currentQuestion ? totalQuestionCount - remainingQuestions : 0;
  const deckProgress = totalQuestionCount === 0 ? 0 : Math.min((drawnCount / totalQuestionCount) * 100, 100);

  return (
    <div className="app-shell min-h-screen px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-6xl flex-col gap-4 sm:min-h-[calc(100vh-3rem)]">
        <header className="frosted-panel rounded-4xl px-4 py-4 sm:px-5 lg:px-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center justify-between gap-3">
              <button onClick={onReset} className="secondary-button" aria-label="Return to game selection screen">
                Back
              </button>
              <span className="eyebrow-label">Live deck</span>
            </div>

            <div className="lg:text-center">
              <h1 className="text-2xl font-semibold tracking-[-0.05em] text-text-primary sm:text-3xl">
                Card Deck Shuffle
              </h1>
              <p className="mt-1 text-sm text-text-secondary">
                One player draws, answers, and passes the device to the next person.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 lg:min-w-[16rem]">
              <div className="quiet-stat">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-text-tertiary">Drawn</p>
                <p className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-text-primary">{drawnCount}</p>
              </div>
              <div className="quiet-stat">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-text-tertiary">Remaining</p>
                <p className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-text-primary">{remainingQuestions}</p>
              </div>
            </div>
          </div>
        </header>

        <div className="grid flex-1 gap-4 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
          <section className="order-2 lg:order-1">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <div className="status-banner">
                Hand the device to a player, let them answer the revealed prompt, then draw again.
              </div>
              <div className="status-banner-success">
                First tap complete. The deck is live.
              </div>
            </div>

            <div className="deck-stage rounded-4xl p-5 sm:p-6 lg:p-7">
              <div className="grid gap-6 lg:grid-cols-[12rem_minmax(0,1fr)] lg:items-stretch">
                <button
                  type="button"
                  onClick={onDrawNext}
                  className="deck-stack-button group mx-auto w-full max-w-56 lg:mx-0"
                  aria-label="Draw another random question card"
                >
                  <div className="deck-stack-card deck-stack-card-back" />
                  <div className="deck-stack-card deck-stack-card-middle" />
                  <div className="deck-stack-card deck-stack-card-front">
                    <div className="deck-stack-core">
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-text-tertiary">Tap deck</p>
                      <p className="mt-5 text-3xl font-semibold tracking-[-0.06em] text-text-primary">{remainingQuestions}</p>
                      <p className="mt-2 text-sm leading-6 text-text-secondary">cards waiting</p>
                    </div>
                  </div>
                </button>

                <article className="question-card rounded-4xl p-5 sm:p-6 lg:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-text-tertiary">Current draw</p>
                      <h2 className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-text-primary sm:text-4xl">
                        {currentQuestion ? 'Question card' : 'Deck ready'}
                      </h2>
                    </div>
                    <div className="status-banner">{drawnCount} / {totalQuestionCount} revealed</div>
                  </div>

                  <p className="mt-6 max-w-2xl text-2xl leading-tight font-semibold tracking-[-0.05em] text-text-primary sm:text-[2.4rem]">
                    {currentQuestion ? `Who in the room ${currentQuestion}?` : 'Tap the deck to reveal the next player prompt.'}
                  </p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    <div className="quiet-stat">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-tertiary">Prompt focus</p>
                      <p className="mt-2 text-sm leading-6 text-text-secondary">Keep the screen on one clear question so the active player can answer without scanning.</p>
                    </div>
                    <div className="quiet-stat">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-tertiary">Pass along</p>
                      <p className="mt-2 text-sm leading-6 text-text-secondary">When the answer lands, tap the deck again and hand the device to the next person.</p>
                    </div>
                    <div className="quiet-stat">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-tertiary">Fresh rotation</p>
                      <p className="mt-2 text-sm leading-6 text-text-secondary">The deck reshuffles automatically when the last prompt has been used.</p>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={onDrawNext}
                      className="primary-button w-full sm:w-auto"
                      aria-label="Draw another question"
                    >
                      Draw another card
                    </button>
                    <div className="status-banner flex items-center justify-center sm:w-auto">
                      Deck progress {Math.round(deckProgress)}%
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </section>

          <aside className="order-1 space-y-4 lg:order-2">
            <div className="product-panel rounded-4xl p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-tertiary">Host guidance</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-text-primary">
                Keep the card moving.
              </h2>
              <p className="mt-3 text-sm leading-6 text-text-secondary">
                The draw works best when each player answers briefly, hands off quickly, and lets the next card reset the energy.
              </p>
              <div className="mt-5 space-y-3">
                <div className="quiet-stat">
                  <p className="text-sm font-medium text-text-primary">Let the prompt lead</p>
                  <p className="mt-1 text-sm leading-6 text-text-secondary">The question card is the script. Resist adding extra explanation around it.</p>
                </div>
                <div className="quiet-stat">
                  <p className="text-sm font-medium text-text-primary">Use redraw to control pace</p>
                  <p className="mt-1 text-sm leading-6 text-text-secondary">If a question falls flat, draw the next one immediately and keep the room moving.</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
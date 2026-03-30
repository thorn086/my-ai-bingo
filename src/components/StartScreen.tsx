interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="app-shell flex min-h-screen items-center px-5 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:items-center">
        <section className="order-2 lg:order-1">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <span className="eyebrow-label mb-5">Bingo Mixer</span>
            <h1 className="max-w-xl text-5xl font-semibold tracking-[-0.06em] text-text-primary sm:text-6xl lg:text-7xl">
              Meet everyone in the room without forcing the moment.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-text-secondary sm:text-lg">
              A quiet, intuitive icebreaker built to help conversations start naturally, one square at a time.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button onClick={onStart} className="primary-button w-full sm:w-auto" aria-label="Start game">
                Start the mixer
              </button>
              <div className="secondary-button w-full justify-center sm:w-auto" aria-hidden="true">
                5 x 5 live bingo board
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="quiet-stat">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-tertiary">Scan the room</p>
                <p className="mt-2 text-sm leading-6 text-text-secondary">Find someone who matches a prompt and mark the square.</p>
              </div>
              <div className="quiet-stat">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-tertiary">Keep it light</p>
                <p className="mt-2 text-sm leading-6 text-text-secondary">The prompts are designed to open conversation, not force performance.</p>
              </div>
              <div className="quiet-stat">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-tertiary">Win quietly</p>
                <p className="mt-2 text-sm leading-6 text-text-secondary">Complete any five-square line to trigger a polished win state.</p>
              </div>
            </div>

            <div className="frosted-panel mt-8 rounded-[2rem] p-6 sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-text-tertiary">How it works</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-lg font-semibold tracking-[-0.03em] text-text-primary">01</p>
                  <p className="mt-2 text-sm leading-6 text-text-secondary">Move through the room and look for people who match each prompt.</p>
                </div>
                <div>
                  <p className="text-lg font-semibold tracking-[-0.03em] text-text-primary">02</p>
                  <p className="mt-2 text-sm leading-6 text-text-secondary">Tap each square as you confirm a match and watch the board take shape.</p>
                </div>
                <div>
                  <p className="text-lg font-semibold tracking-[-0.03em] text-text-primary">03</p>
                  <p className="mt-2 text-sm leading-6 text-text-secondary">Complete five in a row to finish with a clean, satisfying reveal.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="order-1 lg:order-2">
          <div className="hero-visual hero-glow">
            <div className="mesh-orb left-[-4rem] top-[-2rem] h-32 w-32 sm:h-44 sm:w-44" aria-hidden="true" />
            <div className="mesh-orb bottom-[-3rem] right-[-2rem] h-36 w-36 sm:h-52 sm:w-52" aria-hidden="true" />

            <div className="hero-device left-[6%] top-[10%] h-[58%] w-[52%] rotate-[-10deg] p-4 sm:p-5" aria-hidden="true">
              <div className="flex items-start justify-between">
                <div>
                  <div className="h-2.5 w-16 rounded-full bg-surface-strong" />
                  <div className="mt-2 h-2.5 w-24 rounded-full bg-surface-muted" />
                </div>
                <div className="h-8 w-8 rounded-full bg-surface" />
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2">
                {Array.from({ length: 9 }).map((_, index) => (
                  <div
                    key={index}
                    className={index === 4 ? 'h-10 rounded-2xl bg-accent/90' : 'h-10 rounded-2xl bg-surface'}
                  />
                ))}
              </div>
            </div>

            <div className="hero-device bottom-[7%] right-[8%] h-[52%] w-[56%] rotate-[8deg] p-5 sm:p-6" aria-hidden="true">
              <div className="h-3 w-20 rounded-full bg-surface-strong" />
              <div className="mt-4 space-y-3">
                <div className="rounded-3xl bg-surface p-4">
                  <div className="h-2.5 w-24 rounded-full bg-surface-strong" />
                  <div className="mt-3 h-16 rounded-[1.25rem] bg-app-canvas" />
                </div>
                <div className="rounded-3xl bg-accent p-4 text-text-inverse">
                  <div className="h-2.5 w-20 rounded-full bg-text-inverse/35" />
                  <div className="mt-3 h-8 rounded-full bg-text-inverse/12" />
                </div>
              </div>
            </div>

            <div className="product-panel absolute inset-x-6 bottom-6 rounded-[1.75rem] p-5 sm:inset-x-8 sm:p-6" aria-hidden="true">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-text-tertiary">Designed for conversation</p>
                  <p className="mt-3 max-w-52 text-xl font-semibold tracking-[-0.04em] text-text-primary sm:text-2xl">
                    A clean board with room to breathe.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2 rounded-[1.4rem] bg-surface p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className={index === 1 ? 'h-10 w-10 rounded-2xl bg-accent' : 'h-10 w-10 rounded-2xl bg-app-canvas'}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

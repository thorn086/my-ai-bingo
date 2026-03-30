interface StartScreenProps {
  onStart: () => void;
}

const SIGNALS = [
  'Live board momentum',
  'Built for quick wins',
  'Designed for real conversations',
];

const STEPS = [
  {
    number: '01',
    title: 'Scan the room',
    description: 'Use the board like a radar sweep. Every square gives you an easy opener and a reason to move.',
  },
  {
    number: '02',
    title: 'Confirm the match',
    description: 'When someone fits the prompt, mark the square and let the board visibly tighten around the win.',
  },
  {
    number: '03',
    title: 'Hit the line',
    description: 'Five in a row triggers a crisp finish so the game feels energetic without turning into a performance.',
  },
];

const VALUE_POINTS = [
  {
    title: 'More cinematic',
    description: 'The landing page should feel like the room already has energy before the first click.',
  },
  {
    title: 'Still usable',
    description: 'The CTA stays dominant, the copy stays short, and the board preview explains the product at a glance.',
  },
  {
    title: 'On-system',
    description: 'Everything still lives inside the current dark palette, glass surfaces, and restrained interaction model.',
  },
];

const MARKED_TILE_IDS = new Set([2, 3, 7, 8, 9, 12, 14, 17, 19, 22]);
const WINNING_TILE_IDS = new Set([5, 10, 15, 20, 25]);

const PREVIEW_TILES = Array.from({ length: 25 }, (_, index) => {
  const id = index + 1;

  if (id === 13) {
    return { id, tone: 'free' as const };
  }

  if (WINNING_TILE_IDS.has(id)) {
    return { id, tone: 'winning' as const };
  }

  if (MARKED_TILE_IDS.has(id)) {
    return { id, tone: 'marked' as const };
  }

  return { id, tone: 'idle' as const };
});

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="app-shell relative overflow-hidden px-5 py-8 sm:px-8 lg:px-10">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="mesh-orb -left-20 -top-16 h-44 w-44 sm:h-64 sm:w-64" />
        <div className="mesh-orb -bottom-32 -right-12 h-56 w-56 sm:h-72 sm:w-72" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center">
        <div className="landing-hero-shell grid w-full gap-8 rounded-4xl p-5 sm:p-7 lg:grid-cols-[minmax(0,0.96fr)_minmax(0,1.04fr)] lg:gap-8 lg:p-8">
          <section className="flex flex-col justify-center">
            <span className="eyebrow-label mb-5">Bingo Mixer / Motion-led landing</span>

            <h1 className="max-w-lg text-4xl font-semibold tracking-[-0.07em] text-text-primary sm:text-5xl lg:text-6xl xl:text-[5.25rem]">
              Give the room a pulse before the first awkward pause.
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-text-secondary sm:text-lg">
              A live bingo board for social mixers that turns introductions into visible momentum. Walk the room, match
              the prompt, mark the square, and chase the line.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button onClick={onStart} className="primary-button w-full sm:w-auto" aria-label="Start game">
                Start the mixer
              </button>
              <div className="status-banner flex w-full justify-center sm:w-auto">25 prompts. 1 board. Fast room energy.</div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {SIGNALS.map((signal) => (
                <div key={signal} className="landing-signal">
                  {signal}
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="quiet-stat">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-tertiary">Openers built in</p>
                <p className="mt-2 text-sm leading-6 text-text-secondary">
                  Each square gives people a reason to talk without needing a script.
                </p>
              </div>
              <div className="quiet-stat">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-tertiary">Momentum you can see</p>
                <p className="mt-2 text-sm leading-6 text-text-secondary">
                  The board makes progress feel public enough to be exciting, but not loud.
                </p>
              </div>
              <div className="quiet-stat">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-tertiary">Fast finish</p>
                <p className="mt-2 text-sm leading-6 text-text-secondary">
                  The win lands quickly, so the mixer feels energetic instead of dragging.
                </p>
              </div>
            </div>
          </section>

          <section className="flex items-center">
            <div className="landing-stage w-full">
              <div
                className="landing-beam left-[-6%] top-[8%] h-28 w-[52%] rotate-16"
                style={{ background: 'linear-gradient(90deg, rgba(110, 231, 255, 0.28), rgba(110, 231, 255, 0))' }}
                aria-hidden="true"
              />
              <div
                className="landing-beam bottom-[14%] right-[-8%] h-32 w-[58%] rotate-[-18deg]"
                style={{
                  background: 'linear-gradient(90deg, rgba(79, 124, 255, 0.26), rgba(79, 124, 255, 0))',
                  animationDelay: '-4s',
                }}
                aria-hidden="true"
              />
              <div className="landing-orbit left-[-8%] top-[10%] h-48 w-48 sm:h-64 sm:w-64" aria-hidden="true" />
              <div
                className="landing-orbit bottom-[2%] right-[4%] h-36 w-36 sm:h-52 sm:w-52"
                style={{ animationDirection: 'reverse', animationDuration: '24s' }}
                aria-hidden="true"
              />

              <div
                className="landing-preview-card absolute left-4 top-4 z-10 w-46 rounded-3xl p-4 sm:left-6 sm:top-6 sm:w-50"
                style={{ animation: 'gentle-float 6s ease-in-out infinite' }}
                aria-hidden="true"
              >
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-text-tertiary">Room status</p>
                <p className="mt-3 text-xl font-semibold tracking-[-0.05em] text-text-primary sm:text-2xl">Warm intros are live.</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-2.5 w-2.5 rounded-full bg-square-winning" />
                  <p className="text-sm leading-6 text-text-secondary">Momentum builds as more squares lock in.</p>
                </div>
              </div>

              <div className="mx-auto max-w-108 px-2 pb-6 pt-22 sm:px-4 sm:pt-26 lg:pt-28">
                <div className="board-frame relative z-20 overflow-hidden">
                  <div
                    className="pointer-events-none absolute inset-x-8 top-0 h-24 rounded-full blur-3xl"
                    style={{ background: 'radial-gradient(circle, rgba(110, 231, 255, 0.2), rgba(110, 231, 255, 0))' }}
                    aria-hidden="true"
                  />
                  <div className="relative flex items-start justify-between gap-4 pb-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-text-tertiary">Live board preview</p>
                      <p className="mt-2 max-w-[16rem] text-xl font-semibold tracking-[-0.05em] text-text-primary sm:max-w-[18rem] sm:text-[1.65rem]">
                        The board feels active before the game even starts.
                      </p>
                    </div>
                    <div className="status-banner-success shrink-0">4 in a row</div>
                  </div>

                  <div className="board-grid" aria-hidden="true">
                    {PREVIEW_TILES.map((tile) => {
                      const toneClass =
                        tile.tone === 'winning'
                          ? 'square-surface-winning'
                          : tile.tone === 'marked'
                            ? 'square-surface-active'
                            : tile.tone === 'free'
                              ? 'square-surface-free'
                              : 'square-surface';

                      return <div key={tile.id} className={toneClass + ' rounded-[1.1rem]'} />;
                    })}
                  </div>
                </div>
              </div>

              <div
                className="landing-preview-card absolute bottom-5 left-4 hidden w-48 rounded-3xl p-4 md:block lg:left-6 lg:w-52"
                style={{ animation: 'gentle-float 7.5s ease-in-out infinite', animationDelay: '-1.5s' }}
                aria-hidden="true"
              >
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-text-tertiary">Signal boost</p>
                <p className="mt-3 text-lg font-semibold tracking-[-0.04em] text-text-primary">
                  Every marked square makes the room feel more connected.
                </p>
              </div>

              <div
                className="landing-preview-card absolute bottom-6 right-4 z-10 hidden w-44 rounded-3xl p-4 lg:block lg:right-6"
                style={{ animation: 'gentle-float 8.5s ease-in-out infinite', animationDelay: '-3s' }}
                aria-hidden="true"
              >
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-text-tertiary">Win state</p>
                <p className="mt-3 text-lg font-semibold tracking-[-0.04em] text-text-primary">Crisp celebration, no forced spotlight.</p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="relative mx-auto mt-8 grid w-full max-w-6xl gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <section className="frosted-panel rounded-4xl p-6 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-text-tertiary">How the room moves</p>
          <h2 className="mt-3 max-w-lg text-3xl font-semibold tracking-[-0.05em] text-text-primary sm:text-[2.2rem]">
            The landing page should already feel like the game has momentum.
          </h2>

          <div className="mt-6 grid gap-4">
            {STEPS.map((step) => (
              <div key={step.number} className="landing-step flex gap-4 rounded-[1.6rem] p-4 sm:p-5">
                <div className="shrink-0">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-surface text-sm font-semibold text-text-primary">
                    {step.number}
                  </div>
                </div>
                <div>
                  <p className="text-lg font-semibold tracking-[-0.03em] text-text-primary">{step.title}</p>
                  <p className="mt-2 text-sm leading-6 text-text-secondary">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="product-panel rounded-4xl p-6 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-text-tertiary">Why variation 3 works</p>
          <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-[-0.05em] text-text-primary sm:text-[2.2rem]">
            Push the first impression harder, without leaving the design system.
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {VALUE_POINTS.map((point) => (
              <div key={point.title} className="landing-value-card rounded-[1.6rem] p-4 sm:p-5">
                <p className="text-lg font-semibold tracking-[-0.03em] text-text-primary">{point.title}</p>
                <p className="mt-2 text-sm leading-6 text-text-secondary">{point.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

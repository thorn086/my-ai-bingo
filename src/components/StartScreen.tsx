import { useState } from 'react';
import type { GameMode } from '../types';

interface StartScreenProps {
  onStart: (mode: GameMode) => void;
}

interface ModeContent {
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  status: string;
  signals: string[];
  stats: Array<{ title: string; description: string }>;
  steps: Array<{ number: string; title: string; description: string }>;
  valuePoints: Array<{ title: string; description: string }>;
}

const MODE_CONTENT: Record<GameMode, ModeContent> = {
  cards: {
    eyebrow: 'Card Deck Shuffle / Instant prompt reveal',
    title: 'Open the game, tap once, and let the next question pick the player.',
    description:
      'Card Deck Shuffle turns the mixer into a fast handoff. Every player gets a single random prompt card on first tap, answers it, then passes the screen to the next person.',
    cta: 'Draw the first card',
    status: '24 prompts. 1 deck. Zero setup talk.',
    signals: ['One tap reveal', 'Fresh prompt every draw', 'Built for rotating players'],
    stats: [
      {
        title: 'First tap works',
        description: 'Players do not need to learn a board or a rule set before getting a useful question.',
      },
      {
        title: 'Hand-off friendly',
        description: 'One revealed card fills the screen, so the active player always knows what they are answering.',
      },
      {
        title: 'Fresh every round',
        description: 'The deck keeps moving without repeated setup, so the rhythm stays quick and social.',
      },
    ],
    steps: [
      {
        number: '01',
        title: 'Open the deck',
        description: 'Each player lands on the same starting screen, so the game feels obvious before anyone reads instructions.',
      },
      {
        number: '02',
        title: 'Tap once',
        description: 'The first tap reveals a random conversation card immediately, with no setup mode or extra confirmation step.',
      },
      {
        number: '03',
        title: 'Pass it on',
        description: 'After the question lands, the next player can draw another card and keep the pace moving around the group.',
      },
    ],
    valuePoints: [
      {
        title: 'Immediate payoff',
        description: 'The CTA does the actual job of the game: first tap in, first prompt out.',
      },
      {
        title: 'Low friction',
        description: 'The UI only needs one big decision, which makes it easy to hand from player to player.',
      },
      {
        title: 'Same visual system',
        description: 'The deck inherits the same dark glass styling, but the imagery shifts from grid logic to stacked-card tension.',
      },
    ],
  },
  bingo: {
    eyebrow: 'Bingo Mixer / Classic room scan',
    title: 'Keep the original bingo board when you want the room chasing a visible line.',
    description:
      'Bingo mode brings back the 5x5 board. Players move around the room, find matches, mark squares, and race toward five in a row.',
    cta: 'Start bingo board',
    status: '25 spaces. 1 free center. Race the line.',
    signals: ['Classic 5x5 board', 'Race to bingo', 'Great for roaming intros'],
    stats: [
      {
        title: 'Visual momentum',
        description: 'The board makes room progress visible, which pushes people to keep moving and comparing finds.',
      },
      {
        title: 'More strategy',
        description: 'Rows, columns, and diagonals reward players who notice patterns while they mingle.',
      },
      {
        title: 'Original game feel',
        description: 'This is the same bingo-style interaction the app started with, preserved as a separate play option.',
      },
    ],
    steps: [
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
    ],
    valuePoints: [
      {
        title: 'Visible chase',
        description: 'The grid keeps every marked discovery in view, which makes the board feel active and shared.',
      },
      {
        title: 'Room energy',
        description: 'Players can compare progress and feel the line coming together as the board fills in.',
      },
      {
        title: 'Same premium shell',
        description: 'The classic board still sits inside the same dark glass layout and motion system.',
      },
    ],
  },
};

const PREVIEW_CARDS = [
  'has a favorite productivity playlist',
  'can share a small creative work habit',
  'has a creative skill people do not expect',
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
  const [selectedMode, setSelectedMode] = useState<GameMode>('cards');
  const content = MODE_CONTENT[selectedMode];

  return (
    <div className="app-shell relative overflow-hidden px-5 py-8 sm:px-8 lg:px-10">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="mesh-orb -left-20 -top-16 h-44 w-44 sm:h-64 sm:w-64" />
        <div className="mesh-orb -bottom-32 -right-12 h-56 w-56 sm:h-72 sm:w-72" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center">
        <div className="landing-hero-shell grid w-full gap-8 rounded-4xl p-5 sm:p-7 lg:grid-cols-[minmax(0,0.96fr)_minmax(0,1.04fr)] lg:gap-8 lg:p-8">
          <section className="flex flex-col justify-center">
            <span className="eyebrow-label mb-5">{content.eyebrow}</span>

            <h1 className="max-w-lg text-4xl font-semibold tracking-[-0.07em] text-text-primary sm:text-5xl lg:text-6xl xl:text-[5.25rem]">
              {content.title}
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-text-secondary sm:text-lg">
              {content.description}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setSelectedMode('bingo')}
                className={selectedMode === 'bingo' ? 'mode-option mode-option-active' : 'mode-option'}
                aria-pressed={selectedMode === 'bingo'}
                aria-label="Choose bingo mode"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-text-tertiary">Classic mode</span>
                <span className="mt-3 block text-xl font-semibold tracking-[-0.04em] text-text-primary">Bingo Mixer</span>
                <span className="mt-2 block text-sm leading-6 text-text-secondary">Roam the room, mark the grid, and chase five in a row.</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMode('cards')}
                className={selectedMode === 'cards' ? 'mode-option mode-option-active' : 'mode-option'}
                aria-pressed={selectedMode === 'cards'}
                aria-label="Choose card deck mode"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-text-tertiary">New mode</span>
                <span className="mt-3 block text-xl font-semibold tracking-[-0.04em] text-text-primary">Card Deck Shuffle</span>
                <span className="mt-2 block text-sm leading-6 text-text-secondary">Reveal one random question at a time and pass the device along.</span>
              </button>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => onStart(selectedMode)}
                className="primary-button w-full sm:w-auto"
                aria-label={selectedMode === 'cards' ? 'Start the card deck game' : 'Start the bingo game'}
              >
                {content.cta}
              </button>
              <div className="status-banner flex w-full justify-center sm:w-auto">{content.status}</div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {content.signals.map((signal) => (
                <div key={signal} className="landing-signal">
                  {signal}
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {content.stats.map((stat) => (
                <div key={stat.title} className="quiet-stat">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-tertiary">{stat.title}</p>
                  <p className="mt-2 text-sm leading-6 text-text-secondary">{stat.description}</p>
                </div>
              ))}
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
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-text-tertiary">
                  {selectedMode === 'cards' ? 'Draw behavior' : 'Board behavior'}
                </p>
                <p className="mt-3 text-xl font-semibold tracking-[-0.05em] text-text-primary sm:text-2xl">
                  {selectedMode === 'cards' ? 'First tap reveals immediately.' : 'Every tap marks visible progress.'}
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-2.5 w-2.5 rounded-full bg-square-winning" />
                  <p className="text-sm leading-6 text-text-secondary">
                    {selectedMode === 'cards'
                      ? 'No empty intermediate state between launch and question.'
                      : 'The grid stays active as each discovery locks into the board.'}
                  </p>
                </div>
              </div>

              <div className="mx-auto max-w-108 px-2 pb-6 pt-22 sm:px-4 sm:pt-26 lg:pt-28">
                <div className={selectedMode === 'cards' ? 'deck-stage relative z-20 overflow-hidden rounded-4xl p-5 sm:p-6' : 'board-frame relative z-20 overflow-hidden p-5 sm:p-6'}>
                  <div
                    className="pointer-events-none absolute inset-x-8 top-0 h-24 rounded-full blur-3xl"
                    style={{ background: 'radial-gradient(circle, rgba(110, 231, 255, 0.2), rgba(110, 231, 255, 0))' }}
                    aria-hidden="true"
                  />
                  <div className="relative flex items-start justify-between gap-4 pb-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-text-tertiary">
                        {selectedMode === 'cards' ? 'Deck preview' : 'Board preview'}
                      </p>
                      <p className="mt-2 max-w-[16rem] text-xl font-semibold tracking-[-0.05em] text-text-primary sm:max-w-[18rem] sm:text-[1.65rem]">
                        {selectedMode === 'cards'
                          ? 'A stacked deck replaces the grid and points all attention at one player.'
                          : 'The classic 5x5 board keeps the room chasing visible progress together.'}
                      </p>
                    </div>
                    <div className="status-banner-success shrink-0">{selectedMode === 'cards' ? 'Tap to reveal' : 'Tap to mark'}</div>
                  </div>

                  {selectedMode === 'cards' ? (
                    <div className="grid gap-5 lg:grid-cols-[11rem_minmax(0,1fr)] lg:items-center" aria-hidden="true">
                      <div className="deck-stack-hero mx-auto lg:mx-0">
                        <div className="deck-stack-card deck-stack-card-back" />
                        <div className="deck-stack-card deck-stack-card-middle" />
                        <div className="deck-stack-card deck-stack-card-front">
                          <div className="deck-stack-core">
                            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-text-tertiary">Shuffle deck</p>
                            <p className="mt-5 text-3xl font-semibold tracking-[-0.06em] text-text-primary">24</p>
                            <p className="mt-2 text-sm leading-6 text-text-secondary">prompts waiting</p>
                          </div>
                        </div>
                      </div>

                      <div className="question-card min-h-[16rem] rounded-[1.9rem] p-5 sm:p-6">
                        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-text-tertiary">Sample draw</p>
                        <p className="mt-4 max-w-[20rem] text-2xl font-semibold tracking-[-0.05em] text-text-primary sm:text-[2rem]">
                          Who in the room {PREVIEW_CARDS[2]}?
                        </p>
                        <div className="mt-6 grid gap-3 sm:grid-cols-3">
                          {PREVIEW_CARDS.map((card) => (
                            <div key={card} className="landing-value-card rounded-[1.25rem] p-3">
                              <p className="text-sm leading-6 text-text-secondary">{card}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
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
                  )}
                </div>
              </div>

              <div
                className="landing-preview-card absolute bottom-5 left-4 hidden w-48 rounded-3xl p-4 md:block lg:left-6 lg:w-52"
                style={{ animation: 'gentle-float 7.5s ease-in-out infinite', animationDelay: '-1.5s' }}
                aria-hidden="true"
              >
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-text-tertiary">
                  {selectedMode === 'cards' ? 'Passing pattern' : 'Board energy'}
                </p>
                <p className="mt-3 text-lg font-semibold tracking-[-0.04em] text-text-primary">
                  {selectedMode === 'cards'
                    ? 'One revealed card is easier to pass around than a full board.'
                    : 'The board lets players compare progress without stopping the room.'}
                </p>
              </div>

              <div
                className="landing-preview-card absolute bottom-6 right-4 z-10 hidden w-44 rounded-3xl p-4 lg:block lg:right-6"
                style={{ animation: 'gentle-float 8.5s ease-in-out infinite', animationDelay: '-3s' }}
                aria-hidden="true"
              >
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-text-tertiary">
                  {selectedMode === 'cards' ? 'Question focus' : 'Win state'}
                </p>
                <p className="mt-3 text-lg font-semibold tracking-[-0.04em] text-text-primary">
                  {selectedMode === 'cards' ? 'The prompt becomes the whole room cue.' : 'Crisp celebration, no forced spotlight.'}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="relative mx-auto mt-8 grid w-full max-w-6xl gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <section className="frosted-panel rounded-4xl p-6 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-text-tertiary">
            {selectedMode === 'cards' ? 'How the round works' : 'How the room moves'}
          </p>
          <h2 className="mt-3 max-w-lg text-3xl font-semibold tracking-[-0.05em] text-text-primary sm:text-[2.2rem]">
            {selectedMode === 'cards'
              ? 'The product now behaves more like a live card ritual than a checklist.'
              : 'The original board flow is still here when you want a more visible group game.'}
          </h2>

          <div className="mt-6 grid gap-4">
            {content.steps.map((step) => (
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
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-text-tertiary">Why this direction works</p>
          <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-[-0.05em] text-text-primary sm:text-[2.2rem]">
            {selectedMode === 'cards'
              ? 'Reduce the rules on screen and increase the drama of the single reveal.'
              : 'Keep the old bingo behavior without sacrificing the new card mode.'}
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {content.valuePoints.map((point) => (
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

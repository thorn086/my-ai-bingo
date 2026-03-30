import { useEffect, useState } from 'react';
import { useBingoGame } from './hooks/useBingoGame';
import { useCardDeckGame } from './hooks/useCardDeckGame';
import { StartScreen } from './components/StartScreen';
import { GameScreen } from './components/GameScreen';
import { CardGameScreen } from './components/CardGameScreen';
import { BingoModal } from './components/BingoModal';
import type { GameMode } from './types';

const ACTIVE_MODE_KEY = 'mixer-active-mode';

function loadActiveMode(): GameMode | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const storedMode = window.localStorage.getItem(ACTIVE_MODE_KEY);

  return storedMode === 'bingo' || storedMode === 'cards' ? storedMode : null;
}

function App() {
  const [activeMode, setActiveMode] = useState<GameMode | null>(() => loadActiveMode());
  const bingoGame = useBingoGame();
  const cardGame = useCardDeckGame();

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (activeMode === null) {
      window.localStorage.removeItem(ACTIVE_MODE_KEY);
      return;
    }

    window.localStorage.setItem(ACTIVE_MODE_KEY, activeMode);
  }, [activeMode]);

  const handleStart = (mode: GameMode) => {
    setActiveMode(mode);

    if (mode === 'bingo') {
      bingoGame.startGame();
      return;
    }

    cardGame.startGame();
  };

  const handleResetBingo = () => {
    bingoGame.resetGame();
    setActiveMode(null);
  };

  const handleResetCards = () => {
    cardGame.resetGame();
    setActiveMode(null);
  };

  if (activeMode === null) {
    return <StartScreen onStart={handleStart} />;
  }

  if (activeMode === 'bingo') {
    return (
      <>
        <GameScreen
          board={bingoGame.board}
          winningSquareIds={bingoGame.winningSquareIds}
          hasBingo={bingoGame.gameState === 'bingo'}
          onSquareClick={bingoGame.handleSquareClick}
          onReset={handleResetBingo}
        />
        {bingoGame.showBingoModal && (
          <BingoModal onDismiss={bingoGame.dismissModal} />
        )}
      </>
    );
  }

  return (
    <CardGameScreen
      currentQuestion={cardGame.currentQuestion}
      remainingQuestions={cardGame.remainingQuestions.length}
      totalQuestionCount={cardGame.totalQuestionCount}
      onDrawNext={cardGame.drawNextCard}
      onReset={handleResetCards}
    />
  );
}

export default App;

import { useState, useCallback, useMemo, useEffect } from 'react';
import type { GameState } from '../types';
import { questions } from '../data/questions';

export interface CardDeckGameState {
  gameState: Extract<GameState, 'start' | 'playing'>;
  currentQuestion: string | null;
  remainingQuestions: string[];
  totalQuestionCount: number;
}

export interface CardDeckGameActions {
  startGame: () => void;
  drawNextCard: () => void;
  resetGame: () => void;
}

const STORAGE_KEY = 'card-deck-shuffle-state';
const STORAGE_VERSION = 1;

interface StoredCardDeckGameData {
  version: number;
  gameState: Extract<GameState, 'start' | 'playing'>;
  currentQuestion: string | null;
  remainingQuestions: string[];
}

function shuffleQuestions(items: string[]): string[] {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    const currentItem = shuffled[index];

    shuffled[index] = shuffled[swapIndex];
    shuffled[swapIndex] = currentItem;
  }

  return shuffled;
}

function drawFromDeck(deck: string[]): { currentQuestion: string | null; remainingQuestions: string[] } {
  if (deck.length === 0) {
    return {
      currentQuestion: null,
      remainingQuestions: [],
    };
  }

  const [currentQuestion, ...remainingQuestions] = deck;

  return {
    currentQuestion,
    remainingQuestions,
  };
}

function validateStoredData(data: unknown): data is StoredCardDeckGameData {
  if (!data || typeof data !== 'object') {
    return false;
  }

  const obj = data as Record<string, unknown>;

  if (obj.version !== STORAGE_VERSION) {
    return false;
  }

  if (obj.gameState !== 'start' && obj.gameState !== 'playing') {
    return false;
  }

  if (obj.currentQuestion !== null && typeof obj.currentQuestion !== 'string') {
    return false;
  }

  if (!Array.isArray(obj.remainingQuestions)) {
    return false;
  }

  return obj.remainingQuestions.every(
    (question: unknown) => typeof question === 'string' && questions.includes(question)
  );
}

function loadGameState(): Pick<CardDeckGameState, 'gameState' | 'currentQuestion' | 'remainingQuestions'> | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return null;
    }

    const parsed = JSON.parse(saved);

    if (validateStoredData(parsed)) {
      return {
        gameState: parsed.gameState,
        currentQuestion: parsed.currentQuestion,
        remainingQuestions: parsed.remainingQuestions,
      };
    }

    window.localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn('Failed to load card deck game state:', error);
    window.localStorage.removeItem(STORAGE_KEY);
  }

  return null;
}

function saveGameState(
  gameState: Extract<GameState, 'start' | 'playing'>,
  currentQuestion: string | null,
  remainingQuestions: string[]
): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const data: StoredCardDeckGameData = {
      version: STORAGE_VERSION,
      gameState,
      currentQuestion,
      remainingQuestions,
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn('Failed to save card deck game state:', error);
  }
}

export function useCardDeckGame(): CardDeckGameState & CardDeckGameActions {
  const loadedState = useMemo(() => loadGameState(), []);
  const [gameState, setGameState] = useState<Extract<GameState, 'start' | 'playing'>>(
    () => loadedState?.gameState || 'start'
  );
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(
    () => loadedState?.currentQuestion || null
  );
  const [remainingQuestions, setRemainingQuestions] = useState<string[]>(
    () => loadedState?.remainingQuestions || []
  );

  useEffect(() => {
    saveGameState(gameState, currentQuestion, remainingQuestions);
  }, [gameState, currentQuestion, remainingQuestions]);

  const startGame = useCallback(() => {
    const shuffledQuestions = shuffleQuestions(questions);
    const nextCard = drawFromDeck(shuffledQuestions);

    setCurrentQuestion(nextCard.currentQuestion);
    setRemainingQuestions(nextCard.remainingQuestions);
    setGameState('playing');
  }, []);

  const drawNextCard = useCallback(() => {
    setRemainingQuestions((currentDeck) => {
      const deckToDraw = currentDeck.length === 0 ? shuffleQuestions(questions) : currentDeck;
      const nextCard = drawFromDeck(deckToDraw);

      setCurrentQuestion(nextCard.currentQuestion);
      setGameState('playing');

      return nextCard.remainingQuestions;
    });
  }, []);

  const resetGame = useCallback(() => {
    setGameState('start');
    setCurrentQuestion(null);
    setRemainingQuestions([]);
  }, []);

  return {
    gameState,
    currentQuestion,
    remainingQuestions,
    totalQuestionCount: questions.length,
    startGame,
    drawNextCard,
    resetGame,
  };
}
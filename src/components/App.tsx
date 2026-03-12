import { useState, useCallback } from 'react';
import { GameProvider, useGame } from '../context/GameContext.tsx';
import { ProgressProvider } from '../context/ProgressContext.tsx';
import { Header } from './layout/Header.tsx';
import { HomeScreen } from './screens/HomeScreen.tsx';
import { PuzzleScreen } from './screens/PuzzleScreen.tsx';
import { ResultScreen } from './screens/ResultScreen.tsx';
import { allPacks } from '../config/puzzles/index.ts';
import type { PuzzleConfig } from '../types/index.ts';

type Screen = 'home' | 'puzzle' | 'result';

function AppInner() {
  const [screen, setScreen] = useState<Screen>('home');
  const { initPuzzle, state } = useGame();

  const handleSelectPuzzle = useCallback(
    (puzzle: PuzzleConfig) => {
      initPuzzle(puzzle);
      setScreen('puzzle');
    },
    [initPuzzle],
  );

  const handleComplete = useCallback(() => {
    setScreen('result');
  }, []);

  const handleNextLevel = useCallback(() => {
    const currentPuzzle = state.puzzle;
    const pack = allPacks.find((p) => p.puzzles.some((p2) => p2.id === currentPuzzle.id));
    if (pack) {
      const currentIndex = pack.puzzles.findIndex((p) => p.id === currentPuzzle.id);
      const nextPuzzle = pack.puzzles[currentIndex + 1];
      if (nextPuzzle) {
        initPuzzle(nextPuzzle);
        setScreen('puzzle');
        return;
      }
    }
    setScreen('home');
  }, [state.puzzle, initPuzzle]);

  const handleBackToLevels = useCallback(() => {
    setScreen('home');
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {screen === 'home' && <HomeScreen onSelectPuzzle={handleSelectPuzzle} />}
      {screen === 'puzzle' && <PuzzleScreen onComplete={handleComplete} onBackToLevels={handleBackToLevels} />}
      {screen === 'result' && (
        <ResultScreen onNextLevel={handleNextLevel} onBackToLevels={handleBackToLevels} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ProgressProvider>
      <GameProvider>
        <AppInner />
      </GameProvider>
    </ProgressProvider>
  );
}

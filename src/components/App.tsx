import { useState, useCallback } from 'react';
import { GameProvider, useGame } from '../context/GameContext.tsx';
import { ProgressProvider } from '../context/ProgressContext.tsx';
import { Header } from './layout/Header.tsx';
import { HomeScreen } from './screens/HomeScreen.tsx';
import { PuzzleScreen } from './screens/PuzzleScreen.tsx';
import { ResultScreen } from './screens/ResultScreen.tsx';
import type { PuzzleConfig } from '../types/index.ts';

type Screen = 'home' | 'puzzle' | 'result';

function AppInner() {
  const [screen, setScreen] = useState<Screen>('home');
  const { initPuzzle, reset } = useGame();

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

  const handleReplay = useCallback(() => {
    reset();
    setScreen('puzzle');
  }, [reset]);

  const handleBackToLevels = useCallback(() => {
    setScreen('home');
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {screen === 'home' && <HomeScreen onSelectPuzzle={handleSelectPuzzle} />}
      {screen === 'puzzle' && <PuzzleScreen onComplete={handleComplete} onBackToLevels={handleBackToLevels} />}
      {screen === 'result' && (
        <ResultScreen onReplay={handleReplay} onBackToLevels={handleBackToLevels} />
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

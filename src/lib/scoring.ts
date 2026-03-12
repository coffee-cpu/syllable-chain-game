export function calculateStars(mistakes: number, hintsUsed: number): 1 | 2 | 3 {
  if (mistakes === 0 && hintsUsed === 0) return 3;
  if (mistakes <= 2 && hintsUsed <= 1) return 2;
  return 1;
}

/** Derives difficulty from chain length: easy ≤4, medium 5–6, hard ≥7 */
export function getDifficulty(chainLength: number): 'easy' | 'medium' | 'hard' {
  if (chainLength <= 4) return 'easy';
  if (chainLength <= 6) return 'medium';
  return 'hard';
}

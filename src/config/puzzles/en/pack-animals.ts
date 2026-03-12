import type { PuzzlePack } from '../../../types/index.ts';

export const enAnimals: PuzzlePack = {
  id: 'en-animals',
  title: 'Animals',
  icon: '🦋',
  puzzles: [
    {
      id: 'en-animals-butterfly',
      lang: 'en',
      pack: 'en-animals',
      title: 'Butterfly',
      difficulty: 'easy',
      answer: 'BUTTERFLY',
      startPhrase: 'spring garden',
      chain: [
        { left: 'spring garden', syllable: 'BUT', right: 'colorful flowers', emojiLeft: '🌷', emojiRight: '🌸' },
        { left: 'colorful flowers', syllable: 'TER', right: 'gentle breeze', emojiLeft: '🌸', emojiRight: '🍃' },
        { left: 'gentle breeze', syllable: 'FLY', right: 'bright sunshine', emojiLeft: '🍃', emojiRight: '☀️' },
      ],
    },
    {
      id: 'en-animals-elephant',
      lang: 'en',
      pack: 'en-animals',
      title: 'Elephant',
      difficulty: 'easy',
      answer: 'ELEPHANT',
      startPhrase: 'african safari',
      chain: [
        { left: 'african safari', syllable: 'EL', right: 'tall grass', emojiLeft: '🌍', emojiRight: '🌿' },
        { left: 'tall grass', syllable: 'EPH', right: 'watering hole', emojiLeft: '🌿', emojiRight: '💧' },
        { left: 'watering hole', syllable: 'ANT', right: 'big footprints', emojiLeft: '💧', emojiRight: '🐘' },
      ],
    },
  ],
};

import type { PuzzlePack } from '../../../types/index.ts';

export const enAnimals: PuzzlePack = {
  id: 'en-animals',
  titleKey: 'packs.animals',
  icon: '🦋',
  puzzles: [
    {
      id: 'en-animals-butterfly',
      lang: 'en',
      pack: 'en-animals',
      title: 'Butterfly',
      difficulty: 'easy',
      answer: 'BUTTERFLY',
      wordLengths: [9],
      startPhrase: 'spring garden',
      chain: [
        { left: 'spring garden', syllable: 'BUT', right: 'colorful flowers', emojiLeft: '🌷', emojiRight: '🌸' },
        { left: 'colorful flowers', syllable: 'TER', right: 'gentle breeze', emojiLeft: '🌸', emojiRight: '🍃' },
        { left: 'gentle breeze', syllable: 'FLY', right: 'bright sunshine', emojiLeft: '🍃', emojiRight: '☀️' },
        { left: 'bright sunshine', syllable: '', right: 'spring garden', emojiLeft: '☀️', emojiRight: '🌷' },
      ],
    },
    {
      id: 'en-animals-elephant',
      lang: 'en',
      pack: 'en-animals',
      title: 'Elephant',
      difficulty: 'easy',
      answer: 'ELEPHANT',
      wordLengths: [8],
      startPhrase: 'african safari',
      chain: [
        { left: 'african safari', syllable: 'EL', right: 'tall grass', emojiLeft: '🌍', emojiRight: '🌿' },
        { left: 'tall grass', syllable: 'EPH', right: 'watering hole', emojiLeft: '🌿', emojiRight: '💧' },
        { left: 'watering hole', syllable: 'ANT', right: 'big footprints', emojiLeft: '💧', emojiRight: '🐘' },
        { left: 'big footprints', syllable: '', right: 'african safari', emojiLeft: '🐘', emojiRight: '🌍' },
      ],
    },
  ],
};

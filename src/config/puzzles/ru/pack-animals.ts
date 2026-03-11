import type { PuzzlePack } from '../../../types/index.ts';

export const ruAnimals: PuzzlePack = {
  id: 'ru-animals',
  titleKey: 'packs.animals',
  icon: '🦋',
  puzzles: [
    {
      id: 'ru-animals-stick-insect',
      lang: 'ru',
      pack: 'ru-animals',
      title: 'Палочник',
      difficulty: 'medium',
      answer: 'ПАЛОЧНИК',
      startPhrase: 'зелёные листья',
      chain: [
        { left: 'зелёные листья', syllable: 'ПА', right: 'тонкая ветка', emojiLeft: '🌿', emojiRight: '🪵' },
        { left: 'тонкая ветка', syllable: 'ЛОЧ', right: 'мастер маскировки', emojiLeft: '🪵', emojiRight: '🎭' },
        { left: 'мастер маскировки', syllable: 'НИК', right: 'тропический лес', emojiLeft: '🎭', emojiRight: '🌴' },
      ],
    },
  ],
};

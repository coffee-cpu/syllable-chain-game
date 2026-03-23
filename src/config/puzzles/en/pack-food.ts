import type { PuzzlePack } from '../../../types/index.ts';

export const enFood: PuzzlePack = {
  id: 'en-food',
  title: 'Food',
  icon: '🍽️',
  puzzles: [
    {
      id: 'en-food-passion-fruit',
      lang: 'en',
      pack: 'en-food',
      title: 'Passion Fruit',
      difficulty: 'medium',
      answer: 'PASSION FRUIT',
      startPhrase: 'tropical garden',
      chain: [
        { left: 'tropical garden', syllable: 'PAS', right: 'climbing vines', emojiLeft: '🌴', emojiRight: '🌿' },
        { left: 'climbing vines', syllable: 'SION', right: 'sweet fragrance', emojiLeft: '🌿', emojiRight: '🌸' },
        { left: 'sweet fragrance', syllable: 'FRU', right: 'exotic juice', emojiLeft: '🌸', emojiRight: '🍹' },
        { left: 'exotic juice', syllable: 'IT', right: 'purple sunset', emojiLeft: '🍹', emojiRight: '🌅' },
      ],
    },
  ],
};

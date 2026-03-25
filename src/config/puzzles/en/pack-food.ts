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
      answer: 'PASSION FRUIT',
      startPhrase: 'tropical garden',
      chain: [
        { left: 'tropical garden', syllable: 'PAS', right: 'climbing vines', emojiLeft: '🌴', emojiRight: '🌿' },
        { left: 'climbing vines', syllable: 'SI', right: 'ripe on the vine', emojiLeft: '🌿', emojiRight: '🍇' },
        { left: 'ripe on the vine', syllable: 'ON', right: 'sweet fragrance', emojiLeft: '🍇', emojiRight: '🌸' },
        { left: 'sweet fragrance', syllable: 'FRU', right: 'exotic juice', emojiLeft: '🌸', emojiRight: '🍹' },
        { left: 'exotic juice', syllable: 'IT', right: 'purple sunset', emojiLeft: '🍹', emojiRight: '🌅' },
      ],
    },
    {
      id: 'en-food-cherries',
      lang: 'en',
      pack: 'en-food',
      title: 'Cherries',
      answer: 'CHERRIES',
      startPhrase: 'red orchard',
      chain: [
        { left: 'red orchard',     syllable: 'CH', right: 'stone fruit tree',  emojiLeft: '🌳', emojiRight: '🌲' },
        { left: 'stone fruit tree', syllable: 'ER', right: 'ripe and sweet',   emojiLeft: '🌲', emojiRight: '🍒' },
        { left: 'ripe and sweet',  syllable: 'RI',  right: 'summer picking',   emojiLeft: '🍒', emojiRight: '☀️' },
        { left: 'summer picking',  syllable: 'ES',  right: 'cherry blossom',   emojiLeft: '☀️', emojiRight: '🌸' },
      ],
    },
  ],
};

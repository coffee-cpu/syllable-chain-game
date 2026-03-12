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
      answer: 'ПАЛОЧНИК',
      startPhrase: 'летний лес',
      chain: [
        { left: 'летний лес', syllable: 'ПА', right: 'ветка дерева', emojiLeft: '🌳', emojiRight: '🌿' },
        { left: 'ветка дерева', syllable: 'Л', right: 'зелёная листва', emojiLeft: '🌿', emojiRight: '🍃' },
        { left: 'зелёная листва', syllable: 'ОЧ', right: 'мастер маскировки', emojiLeft: '🍃', emojiRight: '🎭' },
        { left: 'мастер маскировки', syllable: 'НИ', right: 'тропический лес', emojiLeft: '🎭', emojiRight: '🌴' },
        { left: 'тропический лес', syllable: 'К', right: 'ловкое насекомое', emojiLeft: '🌴', emojiRight: '🦗' },
      ],
    },
  ],
};

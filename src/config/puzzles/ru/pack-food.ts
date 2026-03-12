import type { PuzzlePack } from '../../../types/index.ts';

export const ruFood: PuzzlePack = {
  id: 'ru-food',
  title: 'Еда и напитки',
  icon: '🍽️',
  puzzles: [
    {
      id: 'ru-food-bon-appetit',
      lang: 'ru',
      pack: 'ru-food',
      title: 'Приятного аппетита',
      answer: 'ПРИЯТНОГО АППЕТИТА',
      startPhrase: 'накрыть на стол',
      chain: [
        { left: 'накрыть на стол', syllable: 'ПРИ', right: 'горячий суп', emojiLeft: '🍽️', emojiRight: '🍲' },
        { left: 'горячий суп', syllable: 'ЯТ', right: 'свежий хлеб', emojiLeft: '🍲', emojiRight: '🍞' },
        { left: 'свежий хлеб', syllable: 'НО', right: 'сочный салат', emojiLeft: '🍞', emojiRight: '🥗' },
        { left: 'сочный салат', syllable: 'ГО', right: 'ароматный чай', emojiLeft: '🥗', emojiRight: '☕' },
        { left: 'ароматный чай', syllable: 'АП', right: 'сладкий торт', emojiLeft: '☕', emojiRight: '🎂' },
        { left: 'сладкий торт', syllable: 'ПЕ', right: 'спелые фрукты', emojiLeft: '🎂', emojiRight: '🍎' },
        { left: 'спелые фрукты', syllable: 'ТИТА', right: 'полный живот', emojiLeft: '🍎', emojiRight: '😋' },
      ],
    },
    {
      id: 'ru-food-tasty-breakfast',
      lang: 'ru',
      pack: 'ru-food',
      title: 'Вкусный завтрак',
      answer: 'ВКУСНЫЙ ЗАВТРАК',
      startPhrase: 'утро на кухне',
      chain: [
        { left: 'утро на кухне', syllable: 'ВКУС', right: 'жарить яичницу', emojiLeft: '🌅', emojiRight: '🍳' },
        { left: 'жарить яичницу', syllable: 'НЫЙ', right: 'намазать масло', emojiLeft: '🍳', emojiRight: '🧈' },
        { left: 'намазать масло', syllable: 'ЗАВ', right: 'налить молоко', emojiLeft: '🧈', emojiRight: '🥛' },
        { left: 'налить молоко', syllable: 'ТР', right: 'хрустящий тост', emojiLeft: '🥛', emojiRight: '🍞' },
        { left: 'хрустящий тост', syllable: 'АК', right: 'сытый и довольный', emojiLeft: '🍞', emojiRight: '😊' },
      ],
    },
  ],
};

import type { PuzzlePack } from '../../../types/index.ts';

export const ruChickens: PuzzlePack = {
  id: 'ru-chickens',
  title: 'Куры',
  icon: '🐔',
  puzzles: [
    {
      id: 'ru-chickens-kuritsa',
      lang: 'ru',
      pack: 'ru-chickens',
      title: 'Курица',
      answer: 'КУРИЦА',
      startPhrase: 'птичий двор',
      chain: [
        { left: 'птичий двор', syllable: 'КУ', right: 'тёплый насест', emojiLeft: '🐓', emojiRight: '🪵' },
        { left: 'тёплый насест', syllable: 'РИ', right: 'свежие яйца', emojiLeft: '🪵', emojiRight: '🥚' },
        { left: 'свежие яйца', syllable: 'ЦА', right: 'деревенская ферма', emojiLeft: '🥚', emojiRight: '🌾' },
      ],
    },
    {
      id: 'ru-chickens-tsyplyonok',
      lang: 'ru',
      pack: 'ru-chickens',
      title: 'Цыплёнок',
      answer: 'ЦЫПЛЁНОК',
      startPhrase: 'яичная скорлупа',
      chain: [
        { left: 'яичная скорлупа', syllable: 'ЦЫП', right: 'пушистый комочек', emojiLeft: '🥚', emojiRight: '🐣' },
        { left: 'пушистый комочек', syllable: 'ЛЁ', right: 'тёплое гнездо', emojiLeft: '🐣', emojiRight: '🪺' },
        { left: 'тёплое гнездо', syllable: 'НОК', right: 'маленькая птица', emojiLeft: '🪺', emojiRight: '🐥' },
      ],
    },
    {
      id: 'ru-chickens-grebeshok',
      lang: 'ru',
      pack: 'ru-chickens',
      title: 'Гребешок',
      answer: 'ГРЕБЕШОК',
      startPhrase: 'красный петух',
      chain: [
        { left: 'красный петух', syllable: 'ГРЕ', right: 'яркое украшение', emojiLeft: '🐓', emojiRight: '🔴' },
        { left: 'яркое украшение', syllable: 'БЕ', right: 'куриная голова', emojiLeft: '🔴', emojiRight: '🐔' },
        { left: 'куриная голова', syllable: 'ШОК', right: 'петушиный двор', emojiLeft: '🐔', emojiRight: '🌻' },
      ],
    },
  ],
};

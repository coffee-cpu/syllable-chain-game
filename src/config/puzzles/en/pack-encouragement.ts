import type { PuzzlePack } from '../../../types/index.ts';

export const enEncouragement: PuzzlePack = {
  id: 'en-encouragement',
  titleKey: 'packs.encouragement',
  icon: '🎉',
  puzzles: [
    {
      id: 'en-encouragement-happy-birthday',
      lang: 'en',
      pack: 'en-encouragement',
      title: 'Happy Birthday',
      answer: 'HAPPY BIRTHDAY',
      startPhrase: 'blow out candles',
      chain: [
        { left: 'blow out candles', syllable: 'HAP', right: 'make a wish', emojiLeft: '🕯️', emojiRight: '✨' },
        { left: 'make a wish', syllable: 'PY', right: 'open presents', emojiLeft: '✨', emojiRight: '🎁' },
        { left: 'open presents', syllable: 'BIRTH', right: 'party hats on', emojiLeft: '🎁', emojiRight: '🥳' },
        { left: 'party hats on', syllable: 'DA', right: 'slice the cake', emojiLeft: '🥳', emojiRight: '🎂' },
        { left: 'slice the cake', syllable: 'Y', right: 'sing along', emojiLeft: '🎂', emojiRight: '🎶' },
      ],
    },
    {
      id: 'en-encouragement-well-done',
      lang: 'en',
      pack: 'en-encouragement',
      title: 'Well Done',
      answer: 'WELL DONE',
      startPhrase: 'finish the task',
      chain: [
        { left: 'finish the task', syllable: 'WE', right: 'thumbs up', emojiLeft: '📝', emojiRight: '👍' },
        { left: 'thumbs up', syllable: 'LL', right: 'big smile', emojiLeft: '👍', emojiRight: '😄' },
        { left: 'big smile', syllable: 'DONE', right: 'round of applause', emojiLeft: '😄', emojiRight: '👏' },
      ],
    },
    {
      id: 'en-encouragement-good-luck-today',
      lang: 'en',
      pack: 'en-encouragement',
      title: 'Good Luck Today',
      answer: 'GOOD LUCK TODAY',
      startPhrase: 'big day ahead',
      chain: [
        { left: 'big day ahead', syllable: 'GO', right: 'cross your fingers', emojiLeft: '📅', emojiRight: '🤞' },
        { left: 'cross your fingers', syllable: 'OD', right: 'four leaf clover', emojiLeft: '🤞', emojiRight: '🍀' },
        { left: 'four leaf clover', syllable: 'LUCK', right: 'bright morning sun', emojiLeft: '🍀', emojiRight: '🌅' },
        { left: 'bright morning sun', syllable: 'TO', right: 'take a deep breath', emojiLeft: '🌅', emojiRight: '🧘' },
        { left: 'take a deep breath', syllable: 'DAY', right: 'you can do it', emojiLeft: '🧘', emojiRight: '💪' },
      ],
    },
  ],
};

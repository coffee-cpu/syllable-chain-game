import type { PuzzlePack } from '../../../types/index.ts';

export const ruHolidays: PuzzlePack = {
  id: 'ru-holidays',
  title: 'Каникулы',
  icon: '🏖️',
  puzzles: [
    {
      id: 'ru-holidays-kanikuly',
      lang: 'ru',
      pack: 'ru-holidays',
      title: 'Каникулы',
      answer: 'КАНИКУЛЫ',
      startPhrase: 'последний звонок',
      chain: [
        { left: 'последний звонок',     syllable: 'К', right: 'азбука приключений',   emojiLeft: '🔔', emojiRight: '📚' },
        { left: 'азбука приключений',   syllable: 'А', right: 'ночь у костра',        emojiLeft: '📚', emojiRight: '🔥' },
        { left: 'ночь у костра',        syllable: 'Н', right: 'игры допоздна',        emojiLeft: '🔥', emojiRight: '🎮' },
        { left: 'игры допоздна',        syllable: 'И', right: 'купание в речке',      emojiLeft: '🎮', emojiRight: '🏊' },
        { left: 'купание в речке',      syllable: 'К', right: 'утренняя зарядка',     emojiLeft: '🏊', emojiRight: '🏋️' },
        { left: 'утренняя зарядка',     syllable: 'У', right: 'лесная тропинка',      emojiLeft: '🏋️', emojiRight: '🌲' },
        { left: 'лесная тропинка',      syllable: 'Л', right: 'яркое лето',           emojiLeft: '🌲', emojiRight: '☀️' },
        { left: 'яркое лето',           syllable: 'Ы', right: 'счастливые дни',       emojiLeft: '☀️', emojiRight: '😊' },
      ],
    },
  ],
};

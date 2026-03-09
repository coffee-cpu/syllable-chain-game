import type { PuzzlePack } from '../../../types/index.ts';

export const enGreetings: PuzzlePack = {
  id: 'en-greetings',
  titleKey: 'packs.greetings',
  icon: '\u{1F44B}',
  puzzles: [
    {
      id: 'en-greetings-good-morning',
      lang: 'en',
      pack: 'en-greetings',
      title: 'Good Morning',
      difficulty: 'easy',
      answer: 'GOOD MORNING',
      wordLengths: [4, 7],
      startPhrase: 'alarm clock rings',
      chain: [
        { left: 'alarm clock rings', syllable: 'GO', right: 'stretch and yawn', emojiLeft: '\u{23F0}', emojiRight: '\u{1F971}' },
        { left: 'stretch and yawn', syllable: 'OD', right: 'brush your teeth', emojiLeft: '\u{1F971}', emojiRight: '\u{1FAA5}' },
        { left: 'brush your teeth', syllable: 'MOR', right: 'eat breakfast', emojiLeft: '\u{1FAA5}', emojiRight: '\u{1F95E}' },
        { left: 'eat breakfast', syllable: 'NING', right: 'open the curtains', emojiLeft: '\u{1F95E}', emojiRight: '\u{1FA9F}' },
        { left: 'open the curtains', syllable: '', right: 'alarm clock rings', emojiLeft: '\u{1FA9F}', emojiRight: '\u{23F0}' },
      ],
    },
  ],
};

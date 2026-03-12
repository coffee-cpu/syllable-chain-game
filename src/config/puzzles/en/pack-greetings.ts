import type { PuzzlePack } from '../../../types/index.ts';

export const enGreetings: PuzzlePack = {
  id: 'en-greetings',
  title: 'Greetings',
  icon: '👋',
  puzzles: [
    {
      id: 'en-greetings-good-morning',
      lang: 'en',
      pack: 'en-greetings',
      title: 'Good Morning',
      difficulty: 'easy',
      answer: 'GOOD MORNING',
      startPhrase: 'alarm clock rings',
      chain: [
        { left: 'alarm clock rings', syllable: 'GO', right: 'stretch and yawn', emojiLeft: '⏰', emojiRight: '🥱' },
        { left: 'stretch and yawn', syllable: 'OD', right: 'brush your teeth', emojiLeft: '🥱', emojiRight: '🪥' },
        { left: 'brush your teeth', syllable: 'MOR', right: 'eat breakfast', emojiLeft: '🪥', emojiRight: '🥞' },
        { left: 'eat breakfast', syllable: 'NING', right: 'open the curtains', emojiLeft: '🥞', emojiRight: '🪟' },
      ],
    },
    {
      id: 'en-greetings-sweet-dreams',
      lang: 'en',
      pack: 'en-greetings',
      title: 'Sweet Dreams',
      difficulty: 'easy',
      answer: 'SWEET DREAMS',
      startPhrase: 'bedtime story',
      chain: [
        { left: 'bedtime story', syllable: 'SWE', right: 'cozy blanket', emojiLeft: '📖', emojiRight: '🛏️' },
        { left: 'cozy blanket', syllable: 'ET', right: 'close your eyes', emojiLeft: '🛏️', emojiRight: '😌' },
        { left: 'close your eyes', syllable: 'DRE', right: 'starry night', emojiLeft: '😌', emojiRight: '🌙' },
        { left: 'starry night', syllable: 'AMS', right: 'soft pillow', emojiLeft: '🌙', emojiRight: '💤' },
      ],
    },
    {
      id: 'en-greetings-welcome-home',
      lang: 'en',
      pack: 'en-greetings',
      title: 'Welcome Home',
      difficulty: 'easy',
      answer: 'WELCOME HOME',
      startPhrase: 'open the door',
      chain: [
        { left: 'open the door', syllable: 'WEL', right: 'warm hugs', emojiLeft: '🚪', emojiRight: '🤗' },
        { left: 'warm hugs', syllable: 'COME', right: 'family dinner', emojiLeft: '🤗', emojiRight: '🍽️' },
        { left: 'family dinner', syllable: 'HO', right: 'cozy fireplace', emojiLeft: '🍽️', emojiRight: '🔥' },
        { left: 'cozy fireplace', syllable: 'ME', right: 'happy together', emojiLeft: '🔥', emojiRight: '❤️' },
      ],
    },
  ],
};

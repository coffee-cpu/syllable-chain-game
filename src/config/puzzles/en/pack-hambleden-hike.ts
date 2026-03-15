import type { PuzzlePack } from '../../../types/index.ts';

export const enHambledenHike: PuzzlePack = {
  id: 'en-hambleden-hike',
  title: 'Hambleden Hike',
  icon: '🥾',
  puzzles: [
    {
      id: 'en-hambleden-hike-hambleden',
      lang: 'en',
      pack: 'en-hambleden-hike',
      title: 'Hambleden',
      answer: 'HAMBLEDEN',
      startPhrase: 'Thames Valley path',
      chain: [
        { left: 'Thames Valley path', syllable: 'HAM', right: 'flint church', emojiLeft: '🏞️', emojiRight: '⛪' },
        { left: 'flint church', syllable: 'BLE', right: 'beech woodland', emojiLeft: '⛪', emojiRight: '🌳' },
        { left: 'beech woodland', syllable: 'DEN', right: 'rolling Chilterns', emojiLeft: '🌳', emojiRight: '⛰️' },
      ],
    },
    {
      id: 'en-hambleden-hike-countryside',
      lang: 'en',
      pack: 'en-hambleden-hike',
      title: 'Countryside',
      answer: 'COUNTRYSIDE',
      startPhrase: 'morning mist',
      chain: [
        { left: 'morning mist', syllable: 'COUN', right: 'winding path', emojiLeft: '🌫️', emojiRight: '🛤️' },
        { left: 'winding path', syllable: 'TRY', right: 'wooden stile', emojiLeft: '🛤️', emojiRight: '🚶' },
        { left: 'wooden stile', syllable: 'SIDE', right: 'open fields', emojiLeft: '🚶', emojiRight: '🌾' },
      ],
    },
    {
      id: 'en-hambleden-hike-wildflower',
      lang: 'en',
      pack: 'en-hambleden-hike',
      title: 'Wildflower',
      answer: 'WILDFLOWER',
      startPhrase: 'grassy verge',
      chain: [
        { left: 'grassy verge', syllable: 'WILD', right: 'spring meadow', emojiLeft: '🌿', emojiRight: '🌸' },
        { left: 'spring meadow', syllable: 'FLOW', right: 'gentle breeze', emojiLeft: '🌸', emojiRight: '🍃' },
        { left: 'gentle breeze', syllable: 'ER', right: 'petal drift', emojiLeft: '🍃', emojiRight: '🌺' },
      ],
    },
  ],
};

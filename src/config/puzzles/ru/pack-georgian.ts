import type { PuzzlePack } from '../../../types/index.ts';

export const ruGeorgian: PuzzlePack = {
  id: 'ru-georgian',
  title: 'Грузинская кухня',
  icon: '🇬🇪',
  puzzles: [
    {
      id: 'ru-georgian-khachapuri',
      lang: 'ru',
      pack: 'ru-georgian',
      title: 'Хачапури',
      difficulty: 'medium',
      answer: 'ХАЧАПУРИ',
      startPhrase: 'раскатать тесто',
      chain: [
        { left: 'раскатать тесто', syllable: 'ХА', right: 'натереть сыр', emojiLeft: '🫓', emojiRight: '🧀' },
        { left: 'натереть сыр', syllable: 'ЧА', right: 'разогреть духовку', emojiLeft: '🧀', emojiRight: '🔥' },
        { left: 'разогреть духовку', syllable: 'ПУ', right: 'разбить яйцо сверху', emojiLeft: '🔥', emojiRight: '🥚' },
        { left: 'разбить яйцо сверху', syllable: 'РИ', right: 'румяная корочка', emojiLeft: '🥚', emojiRight: '✨' },
      ],
    },
    {
      id: 'ru-georgian-khinkali',
      lang: 'ru',
      pack: 'ru-georgian',
      title: 'Хинкали',
      difficulty: 'easy',
      answer: 'ХИНКАЛИ',
      startPhrase: 'замесить крутое тесто',
      chain: [
        { left: 'замесить крутое тесто', syllable: 'Х', right: 'нарубить говядину', emojiLeft: '🫓', emojiRight: '🥩' },
        { left: 'нарубить говядину', syllable: 'ИН', right: 'смешать с луком', emojiLeft: '🥩', emojiRight: '🧅' },
        { left: 'смешать с луком', syllable: 'КА', right: 'лепить с хвостиком', emojiLeft: '🧅', emojiRight: '🤌' },
        { left: 'лепить с хвостиком', syllable: 'ЛИ', right: 'варить в кастрюле', emojiLeft: '🤌', emojiRight: '🫕' },
      ],
    },
  ],
};

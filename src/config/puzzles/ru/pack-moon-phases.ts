import type { PuzzlePack } from '../../../types/index.ts';

export const ruMoonPhases: PuzzlePack = {
  id: 'ru-moon-phases',
  title: 'Фазы Луны',
  icon: '🌙',
  puzzles: [
    {
      id: 'ru-moon-phases-novolunie',
      lang: 'ru',
      pack: 'ru-moon-phases',
      title: 'Новолуние',
      answer: 'НОВОЛУНИЕ',
      startPhrase: 'тёмное небо',
      chain: [
        { left: 'тёмное небо',     syllable: 'НО', right: 'ночная тишина',  emojiLeft: '🌑', emojiRight: '🤫' },
        { left: 'ночная тишина',   syllable: 'ВО', right: 'лунный цикл',    emojiLeft: '🤫', emojiRight: '🔄' },
        { left: 'лунный цикл',     syllable: 'ЛУ', right: 'начало месяца',  emojiLeft: '🔄', emojiRight: '📅' },
        { left: 'начало месяца',   syllable: 'НИ', right: 'невидимый диск', emojiLeft: '📅', emojiRight: '⚫' },
        { left: 'невидимый диск',  syllable: 'Е',  right: 'звёздная ночь',  emojiLeft: '⚫', emojiRight: '✨' },
      ],
    },
    {
      id: 'ru-moon-phases-polnolunie',
      lang: 'ru',
      pack: 'ru-moon-phases',
      title: 'Полнолуние',
      answer: 'ПОЛНОЛУНИЕ',
      startPhrase: 'яркая ночь',
      chain: [
        { left: 'яркая ночь',        syllable: 'ПОЛ', right: 'серебристый свет', emojiLeft: '🌕', emojiRight: '🌟' },
        { left: 'серебристый свет',  syllable: 'НО',  right: 'ночное небо',      emojiLeft: '🌟', emojiRight: '🌌' },
        { left: 'ночное небо',       syllable: 'ЛУ',  right: 'круглый диск',     emojiLeft: '🌌', emojiRight: '⭕' },
        { left: 'круглый диск',      syllable: 'НИ',  right: 'волчий вой',       emojiLeft: '⭕', emojiRight: '🐺' },
        { left: 'волчий вой',        syllable: 'Е',   right: 'лунная дорожка',   emojiLeft: '🐺', emojiRight: '🌊' },
      ],
    },
  ],
};

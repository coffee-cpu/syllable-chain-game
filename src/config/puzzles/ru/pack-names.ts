import type { PuzzlePack } from '../../../types/index.ts';

export const ruNames: PuzzlePack = {
  id: 'ru-names',
  title: 'Имена',
  icon: '👤',
  puzzles: [
    {
      id: 'ru-names-vitalik',
      lang: 'ru',
      pack: 'ru-names',
      title: 'Виталик',
      answer: 'ВИТАЛИК',
      startPhrase: 'веселье и смех',
      chain: [
        { left: 'веселье и смех',    syllable: 'ВИ',  right: 'танцы до утра',      emojiLeft: '🎉', emojiRight: '💃' },
        { left: 'танцы до утра',      syllable: 'ТА',  right: 'лирическая мечта',   emojiLeft: '💃', emojiRight: '✨' },
        { left: 'лирическая мечта',   syllable: 'ЛИ',  right: 'крепкая дружба',     emojiLeft: '✨', emojiRight: '🤝' },
        { left: 'крепкая дружба',     syllable: 'К',   right: 'весёлый парень',      emojiLeft: '🤝', emojiRight: '😄' },
      ],
    },
    {
      id: 'ru-names-sashka',
      lang: 'ru',
      pack: 'ru-names',
      title: 'Сашка',
      answer: 'САШКА',
      startPhrase: 'солнечная улыбка',
      chain: [
        { left: 'солнечная улыбка',  syllable: 'С',   right: 'активный дружок',     emojiLeft: '☀️', emojiRight: '🏃' },
        { left: 'активный дружок',   syllable: 'А',   right: 'широкая ладонь',      emojiLeft: '🏃', emojiRight: '🖐️' },
        { left: 'широкая ладонь',    syllable: 'Ш',   right: 'карие глаза',         emojiLeft: '🖐️', emojiRight: '👀' },
        { left: 'карие глаза',       syllable: 'КА',  right: 'душа компании',       emojiLeft: '👀', emojiRight: '🥳' },
      ],
    },
    {
      id: 'ru-names-zhenya',
      lang: 'ru',
      pack: 'ru-names',
      title: 'Женя',
      answer: 'ЖЕНЯ',
      startPhrase: 'живой взгляд',
      chain: [
        { left: 'живой взгляд',           syllable: 'Ж',  right: 'естественная харизма', emojiLeft: '👁️', emojiRight: '⚡' },
        { left: 'естественная харизма',   syllable: 'Е',  right: 'настоящий друг',       emojiLeft: '⚡', emojiRight: '🫂' },
        { left: 'настоящий друг',         syllable: 'Н',  right: 'яркая личность',       emojiLeft: '🫂', emojiRight: '🌟' },
        { left: 'яркая личность',         syllable: 'Я',  right: 'добрый человек',       emojiLeft: '🌟', emojiRight: '❤️' },
      ],
    },
    {
      id: 'ru-names-dima',
      lang: 'ru',
      pack: 'ru-names',
      title: 'Дима',
      answer: 'ДИМА',
      startPhrase: 'добрая душа',
      chain: [
        { left: 'добрая душа',      syllable: 'Д',  right: 'искренний смех',    emojiLeft: '💛', emojiRight: '😂' },
        { left: 'искренний смех',   syllable: 'И',  right: 'мягкий характер',   emojiLeft: '😂', emojiRight: '🕊️' },
        { left: 'мягкий характер',  syllable: 'М',  right: 'активная жизнь',    emojiLeft: '🕊️', emojiRight: '🚴' },
        { left: 'активная жизнь',   syllable: 'А',  right: 'надёжный человек',  emojiLeft: '🚴', emojiRight: '🛡️' },
      ],
    },
    {
      id: 'ru-names-pavel',
      lang: 'ru',
      pack: 'ru-names',
      title: 'Павел',
      answer: 'ПАВЕЛ',
      startPhrase: 'простой парень',
      chain: [
        { left: 'простой парень',   syllable: 'П',   right: 'алый рассвет',      emojiLeft: '🙂', emojiRight: '🌅' },
        { left: 'алый рассвет',     syllable: 'А',   right: 'верный товарищ',    emojiLeft: '🌅', emojiRight: '🤜' },
        { left: 'верный товарищ',   syllable: 'ВЕ',  right: 'лёгкая походка',    emojiLeft: '🤜', emojiRight: '🚶' },
        { left: 'лёгкая походка',   syllable: 'Л',   right: 'настоящий лидер',   emojiLeft: '🚶', emojiRight: '👑' },
      ],
    },
  ],
};

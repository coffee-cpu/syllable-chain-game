import type { PuzzlePack } from '../../../types/index.ts';

export const ruGreetings: PuzzlePack = {
  id: 'ru-greetings',
  titleKey: 'packs.greetings',
  icon: '👋',
  puzzles: [
    {
      id: 'ru-greetings-good-morning',
      lang: 'ru',
      pack: 'ru-greetings',
      title: 'Доброе утро',
      difficulty: 'easy',
      answer: 'ДОБРОЕ УТРО',
      startPhrase: 'рано проснулся',
      chain: [
        { left: 'рано проснулся', syllable: 'ДО', right: 'открыть глаза', emojiLeft: '🌅', emojiRight: '👀' },
        { left: 'открыть глаза', syllable: 'Б', right: 'сделать зарядку', emojiLeft: '👀', emojiRight: '🏋️' },
        { left: 'сделать зарядку', syllable: 'РО', right: 'вкусный завтрак', emojiLeft: '🏋️', emojiRight: '🥣' },
        { left: 'вкусный завтрак', syllable: 'Е', right: 'отличное настроение', emojiLeft: '🥣', emojiRight: '😊' },
        { left: 'отличное настроение', syllable: 'У', right: 'светит солнце', emojiLeft: '😊', emojiRight: '☀️' },
        { left: 'светит солнце', syllable: 'Т', right: 'душистое мыло', emojiLeft: '☀️', emojiRight: '🧼' },
        { left: 'душистое мыло', syllable: 'РО', right: 'весёлая игра', emojiLeft: '🧼', emojiRight: '🎮' },
      ],
    },
    {
      id: 'ru-greetings-good-night',
      lang: 'ru',
      pack: 'ru-greetings',
      title: 'Спокойной ночи',
      difficulty: 'easy',
      answer: 'СПОКОЙНОЙ НОЧИ',
      startPhrase: 'пора спать',
      chain: [
        { left: 'пора спать', syllable: 'СПО', right: 'мягкая подушка', emojiLeft: '😴', emojiRight: '🛏️' },
        { left: 'мягкая подушка', syllable: 'КОЙ', right: 'тёплое одеяло', emojiLeft: '🛏️', emojiRight: '🧸' },
        { left: 'тёплое одеяло', syllable: 'НОЙ', right: 'луна в окне', emojiLeft: '🧸', emojiRight: '🌙' },
        { left: 'луна в окне', syllable: 'НОЧИ', right: 'сладкие сны', emojiLeft: '🌙', emojiRight: '💤' },
      ],
    },
    {
      id: 'ru-greetings-welcome',
      lang: 'ru',
      pack: 'ru-greetings',
      title: 'Добро пожаловать',
      difficulty: 'easy',
      answer: 'ДОБРО ПОЖАЛОВАТЬ',
      startPhrase: 'открытая дверь',
      chain: [
        { left: 'открытая дверь', syllable: 'ДОБ', right: 'тёплый приём', emojiLeft: '🚪', emojiRight: '🤗' },
        { left: 'тёплый приём', syllable: 'РО', right: 'накрытый стол', emojiLeft: '🤗', emojiRight: '🍽️' },
        { left: 'накрытый стол', syllable: 'ПО', right: 'уютный дом', emojiLeft: '🍽️', emojiRight: '🏠' },
        { left: 'уютный дом', syllable: 'ЖА', right: 'дорогие гости', emojiLeft: '🏠', emojiRight: '👨‍👩‍👧‍👦' },
        { left: 'дорогие гости', syllable: 'ЛОВАТЬ', right: 'радостная встреча', emojiLeft: '👨‍👩‍👧‍👦', emojiRight: '🎉' },
      ],
    },
  ],
};

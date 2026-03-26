import type { PuzzlePack } from '../../../types/index.ts';

export const enPoetryFestival: PuzzlePack = {
  id: 'en-poetry-festival',
  title: 'Poetry Festival',
  icon: '🎤',
  puzzles: [
    {
      id: 'en-poetry-festival-recital',
      lang: 'en',
      pack: 'en-poetry-festival',
      title: 'Recital',
      answer: 'RECITAL',
      startPhrase: 'school stage',
      chain: [
        { left: 'school stage', syllable: 'RE', right: 'bright spotlight', emojiLeft: '🏫', emojiRight: '💡' },
        { left: 'bright spotlight', syllable: 'CI', right: 'proud parents', emojiLeft: '💡', emojiRight: '👨‍👩‍👧' },
        { left: 'proud parents', syllable: 'TAL', right: 'happy smiles', emojiLeft: '👨‍👩‍👧', emojiRight: '😊' },
      ],
    },
    {
      id: 'en-poetry-festival-poetry',
      lang: 'en',
      pack: 'en-poetry-festival',
      title: 'Poetry',
      answer: 'POETRY',
      startPhrase: 'open book',
      chain: [
        { left: 'open book', syllable: 'PO', right: 'rhyming words', emojiLeft: '📖', emojiRight: '✏️' },
        { left: 'rhyming words', syllable: 'ET', right: 'gentle rhythm', emojiLeft: '✏️', emojiRight: '🎵' },
        { left: 'gentle rhythm', syllable: 'RY', right: 'standing ovation', emojiLeft: '🎵', emojiRight: '👏' },
      ],
    },
    {
      id: 'en-poetry-festival-applause',
      lang: 'en',
      pack: 'en-poetry-festival',
      title: 'Applause',
      answer: 'APPLAUSE',
      startPhrase: 'final bow',
      chain: [
        { left: 'final bow', syllable: 'AP', right: 'cheering crowd', emojiLeft: '🎭', emojiRight: '🎉' },
        { left: 'cheering crowd', syllable: 'PLAU', right: 'happy faces', emojiLeft: '🎉', emojiRight: '😄' },
        { left: 'happy faces', syllable: 'SE', right: 'flower bouquet', emojiLeft: '😄', emojiRight: '💐' },
      ],
    },
    {
      id: 'en-poetry-festival-poetry-festival',
      lang: 'en',
      pack: 'en-poetry-festival',
      title: 'Poetry Festival',
      answer: 'POETRY FESTIVAL',
      startPhrase: 'school auditorium',
      chain: [
        { left: 'school auditorium', syllable: 'PO', right: 'decorated stage', emojiLeft: '🏫', emojiRight: '🎪' },
        { left: 'decorated stage', syllable: 'ET', right: 'colorful banners', emojiLeft: '🎪', emojiRight: '🎏' },
        { left: 'colorful banners', syllable: 'RY', right: 'rows of chairs', emojiLeft: '🎏', emojiRight: '💺' },
        { left: 'rows of chairs', syllable: 'FES', right: 'excited children', emojiLeft: '💺', emojiRight: '🧒' },
        { left: 'excited children', syllable: 'TI', right: 'proud teachers', emojiLeft: '🧒', emojiRight: '👩‍🏫' },
        { left: 'proud teachers', syllable: 'VAL', right: 'thundering applause', emojiLeft: '👩‍🏫', emojiRight: '👏' },
      ],
    },
  ],
};

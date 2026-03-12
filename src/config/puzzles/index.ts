import type { PuzzlePack } from '../../types/index.ts';
import { ruGreetings } from './ru/pack-greetings.ts';
import { ruFood } from './ru/pack-food.ts';
import { ruWishes } from './ru/pack-wishes.ts';
import { ruGeorgian } from './ru/pack-georgian.ts';
import { ruAnimals } from './ru/pack-animals.ts';
import { ruChickens } from './ru/pack-chickens.ts';
import { enGreetings } from './en/pack-greetings.ts';
import { enAnimals } from './en/pack-animals.ts';
import { enEncouragement } from './en/pack-encouragement.ts';

export const allPacks: PuzzlePack[] = [
  ruGreetings,
  ruFood,
  ruWishes,
  ruGeorgian,
  ruAnimals,
  ruChickens,
  enGreetings,
  enAnimals,
  enEncouragement,
];

export function getPacksByLang(lang: string): PuzzlePack[] {
  return allPacks.filter((pack) =>
    pack.puzzles.length > 0 && pack.puzzles[0].lang === lang
  );
}

export function getAllPuzzles() {
  return allPacks.flatMap((pack) => pack.puzzles);
}

import type { PuzzlePack } from '../../types/index.ts';
import { ruGreetings } from './ru/pack-greetings.ts';
import { enGreetings } from './en/pack-greetings.ts';

export const allPacks: PuzzlePack[] = [ruGreetings, enGreetings];

export function getPacksByLang(lang: string): PuzzlePack[] {
  return allPacks.filter((pack) =>
    pack.puzzles.length > 0 && pack.puzzles[0].lang === lang
  );
}

export function getAllPuzzles() {
  return allPacks.flatMap((pack) => pack.puzzles);
}

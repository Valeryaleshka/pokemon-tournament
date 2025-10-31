import {MAX_POKEMON_ID, MIN_POKEMON_ID} from '../constants/pokemon.constants';

export function generateUniquePokemonIds(count: number): number[] {
  if (count < MIN_POKEMON_ID || count > MAX_POKEMON_ID) {
    throw new Error(`Count must be between ${MIN_POKEMON_ID} and ${MAX_POKEMON_ID}`);
  }

  const allNumbers = Array.from({length: MAX_POKEMON_ID}, (_, i) => i + 1);

  for (let i = allNumbers.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [allNumbers[i], allNumbers[randomIndex]] = [allNumbers[randomIndex], allNumbers[i]];
  }

  return allNumbers.slice(0, count);
}

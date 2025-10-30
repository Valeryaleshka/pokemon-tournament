import {MaxPokemonId, MinPokemonId} from '../constants/pokemon.constants';

export function generateUniquePokemonIds(count: number): number[] {
  if (count < MinPokemonId || count > MaxPokemonId) {
    throw new Error(`Count must be between ${MinPokemonId} and ${MaxPokemonId}`);
  }

  const allNumbers = Array.from({length: MaxPokemonId}, (_, i) => i + 1);

  for (let i = allNumbers.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [allNumbers[i], allNumbers[randomIndex]] = [allNumbers[randomIndex], allNumbers[i]];
  }
  
  return allNumbers.slice(0, count);
}

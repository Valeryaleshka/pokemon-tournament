export interface IPokemon {
  id: number;
  name: string;
  type: PokemonType;
  baseExperience: number;
  wins: number;
  losses: number;
  ties: number;
  winrate: number;
  imageUrl: string;
}

export enum PokemonType {
  WATER = 'water',
  FIRE = 'fire',
  GRASS = 'grass',
  ELECTRIC = 'electric',
  GHOST = 'ghost',
  PSYCHIC = 'psychic',
  FIGHTING = 'fighting',
  DARK = 'dark',
  NORMAL = 'normal'
}

export interface PokemonBattleResult {
  winner: IPokemon | null;
  loser: IPokemon | null;
  isTie: boolean;
}

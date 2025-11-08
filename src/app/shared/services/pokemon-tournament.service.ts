import { Injectable } from '@angular/core';
import { IPokemon, PokemonBattleResult, PokemonType } from '../types/pokemon.types';

@Injectable({
  providedIn: 'root'
})
export class PokemonTournamentService {

  private readonly typeAdvantages = new Map<PokemonType, PokemonType[]>([
    [PokemonType.WATER, [PokemonType.FIRE]],
    [PokemonType.FIRE, [PokemonType.GRASS]],
    [PokemonType.GRASS, [PokemonType.ELECTRIC]],
    [PokemonType.ELECTRIC, [PokemonType.WATER]],
    [PokemonType.GHOST, [PokemonType.PSYCHIC]],
    [PokemonType.PSYCHIC, [PokemonType.FIGHTING]],
    [PokemonType.FIGHTING, [PokemonType.DARK]],
    [PokemonType.DARK, [PokemonType.GHOST]]
  ]);

  private doesTypeBeat(typeA: PokemonType, typeB: PokemonType): boolean {
    return !!this.typeAdvantages.get(typeA)?.includes(typeB);
  }

  private calculateWinRates(pokemons: IPokemon[], stats: {
    wins: Map<number, number>;
    losses: Map<number, number>;
    ties: Map<number, number>;
  }): IPokemon[] {
    return pokemons.map(pokemon => {
      const wins = stats.wins.get(pokemon.id) || 0;
      const losses = stats.losses.get(pokemon.id) || 0;
      const ties = stats.ties.get(pokemon.id) || 0;
      const totalBattles = wins + losses + ties;
      const winrate = totalBattles > 0 ? (wins / totalBattles) * 100 : 0;

      return {
        ...pokemon,
        wins,
        losses,
        ties,
        winrate: Math.round(winrate)
      };
    });
  }

  public simulateBattleOneOnOne(pokemonA: IPokemon, pokemonB: IPokemon): PokemonBattleResult {
    const aBeatsB = this.doesTypeBeat(pokemonA.type, pokemonB.type);
    const bBeatsA = this.doesTypeBeat(pokemonB.type, pokemonA.type);

    if (aBeatsB && !bBeatsA) {
      return { winner: pokemonA, loser: pokemonB, isTie: false };
    }

    if (bBeatsA && !aBeatsB) {
      return { winner: pokemonB, loser: pokemonA, isTie: false };
    }

    if (pokemonA.baseExperience > pokemonB.baseExperience) {
      return { winner: pokemonA, loser: pokemonB, isTie: false };
    }

    if (pokemonB.baseExperience > pokemonA.baseExperience) {
      return { winner: pokemonB, loser: pokemonA, isTie: false };
    }

    return { winner: null, loser: null, isTie: true };
  }

  public simulateTournamentBattleForAll(pokemons: IPokemon[]): IPokemon[] {
    const stats = {
      wins: new Map<number, number>(),
      losses: new Map<number, number>(),
      ties: new Map<number, number>(),
    };

    for (let i = 0; i < pokemons.length; i++) {
      for (let j = i + 1; j < pokemons.length; j++) {
        const pokemonA = pokemons[i];
        const pokemonB = pokemons[j];
        this.simulateBattle(stats, pokemonA, pokemonB);
      }
    }

    return this.calculateWinRates(pokemons, stats);
  }

  public simulateBattle(stats: {
    wins: Map<number, number>;
    losses: Map<number, number>;
    ties: Map<number, number>;
  }, pokemonA: IPokemon, pokemonB: IPokemon): void {
    const result = this.simulateBattleOneOnOne(pokemonA, pokemonB);
    if (result.isTie) {
      stats.ties.set(pokemonA.id, (stats.ties.get(pokemonA.id) ?? 0) + 1);
      stats.ties.set(pokemonB.id, (stats.ties.get(pokemonB.id) ?? 0) + 1);
    } else if (result.winner === pokemonA) {
      stats.wins.set(pokemonA.id, (stats.wins.get(pokemonA.id) ?? 0) + 1);
      stats.losses.set(pokemonB.id, (stats.losses.get(pokemonB.id) ?? 0) + 1);
    } else {
      stats.wins.set(pokemonB.id, (stats.wins.get(pokemonB.id) ?? 0) + 1);
      stats.losses.set(pokemonA.id, (stats.losses.get(pokemonA.id) ?? 0) + 1);
    }
  }
}

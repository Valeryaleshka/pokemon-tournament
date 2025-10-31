import {IPokemon, PokemonBattleResult, PokemonType} from '../types/pokemon.types';
import {Injectable} from '@angular/core';


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
    const advantages = this.typeAdvantages.get(typeA);
    return advantages ? advantages.includes(typeB) : false;
  }

  private calculateWinRates(pokemons: IPokemon[]): IPokemon[] {
    return pokemons.map(pokemon => {
      const totalBattles = pokemon.wins + pokemon.losses + pokemon.ties;
      const winrate = totalBattles > 0 ? (pokemon.wins / totalBattles) * 100 : 0;

      return {
        ...pokemon,
        winrate: Math.round(winrate)
      };
    });
  }

  public simulateBattleOneOnOne(pokemonA: IPokemon, pokemonB: IPokemon): PokemonBattleResult {
    const aBeatsB = this.doesTypeBeat(pokemonA.type, pokemonB.type);
    const bBeatsA = this.doesTypeBeat(pokemonB.type, pokemonA.type);

    if (aBeatsB && !bBeatsA) {
      return {winner: pokemonA, loser: pokemonB, isTie: false};
    }

    if (bBeatsA && !aBeatsB) {
      return {winner: pokemonB, loser: pokemonA, isTie: false};
    }

    if (pokemonA.baseExperience > pokemonB.baseExperience) {
      return {winner: pokemonA, loser: pokemonB, isTie: false};
    }

    if (pokemonB.baseExperience > pokemonA.baseExperience) {
      return {winner: pokemonB, loser: pokemonA, isTie: false};
    }

    return {winner: null, loser: null, isTie: true};
  }

  public simulateTournamentBattleForAll(pokemons: IPokemon[]): IPokemon[] {
    const resetPokemons = this.resetBattleStats(pokemons);

    for (let i = 0; i < resetPokemons.length; i++) {
      for (let j = i + 1; j < resetPokemons.length; j++) {
        const pokemonA = resetPokemons[i];
        const pokemonB = resetPokemons[j];

        this.simulateBattle(pokemonA, pokemonB);
      }
    }

    return this.calculateWinRates(resetPokemons);
  }

  public simulateBattle(pokemonA: IPokemon, pokemonB: IPokemon): void {
    const result = this.simulateBattleOneOnOne(pokemonA, pokemonB);

    if (result.isTie) {
      pokemonA.ties++;
      pokemonB.ties++;
    } else if (result.winner === pokemonA) {
      pokemonA.wins++;
      pokemonB.losses++;
    } else {
      pokemonB.wins++;
      pokemonA.losses++;
    }

    pokemonA.baseExperience
  }

  public resetBattleStats(pokemons: IPokemon[]): IPokemon[] {
    console.log('resetBattleStats');
    return pokemons.map(pokemon => ({
      ...pokemon,
      wins: 0,
      losses: 0,
      ties: 0,
      winrate: 0
    }));
  }
}

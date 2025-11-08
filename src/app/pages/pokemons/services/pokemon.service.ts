import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, combineLatest, finalize, Observable, of, switchMap } from 'rxjs';
import { generateUniquePokemonIds } from '../../../shared/helpers/pokemon.helpers';
import { PokemonProvider } from '../../../shared/providers/pokemon.provider';
import { PokemonTournamentService } from "../../../shared/services/pokemon-tournament.service";
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { MAX_POKEMON_ID, MIN_POKEMON_ID } from '../../../shared/constants/pokemon.constants';
import { IPokemon } from '../../../shared/types/pokemon.types';

@Injectable()
export class PokemonService {
  private readonly provider = inject(PokemonProvider);
  private readonly pokemonTournamentService = inject(PokemonTournamentService);

  private readonly numberOfPokemons$ = new BehaviorSubject<number>(0);
  public loading = signal<boolean>(false);

  public readonly pokemons = toSignal(
    this.numberOfPokemons$.pipe(switchMap(number => {
      if (number > 0) {
        this.loading.set(true);

        return combineLatest(this.generateObservables(generateUniquePokemonIds(number)))
          .pipe(map(pokemons => this.pokemonTournamentService.simulateTournamentBattleForAll(pokemons)))
          .pipe(finalize(() =>
          {
            this.loading.set(false)
          }));
      } else {
        this.loading.set(false);

        return of([])
      }
    })),
    { initialValue: [] }
  );

  public setNumberOfPokemons(count: number) {
    if (count < MIN_POKEMON_ID || count > MAX_POKEMON_ID) {
      console.warn(`Number of pokemons must be between ${MIN_POKEMON_ID} and ${MAX_POKEMON_ID}`);

      return;
    }
    this.numberOfPokemons$.next(count);
  }

  private generateObservables(ids: number[]): Observable<IPokemon>[] {
    return ids.map(id => this.provider.getSinglePokemon(id));
  }
}


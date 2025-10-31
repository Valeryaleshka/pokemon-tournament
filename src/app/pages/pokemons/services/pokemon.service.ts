import {inject, Injectable, signal} from '@angular/core';
import { BehaviorSubject, combineLatest, finalize, Observable, switchMap } from 'rxjs';
import {generateUniquePokemonIds} from '../../../shared/helpers/pokemon.helpers';
import {PokemonProvider} from '../../../shared/providers/pokemon.provider';
import {PokemonTournamentService} from "../../../shared/services/pokemon-tournament.service";
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

@Injectable()
export class PokemonService {
  private readonly provider = inject(PokemonProvider);
  private readonly pokemonTournamentService = inject(PokemonTournamentService);

  private readonly numberOfPokemons$ = new BehaviorSubject<number>(16);
  public loading = signal<boolean>(false);

  public readonly pokemons = toSignal(
    this.numberOfPokemons$.pipe(switchMap(number => {
      this.loading.set(true);
      return combineLatest(this.generateObservables(generateUniquePokemonIds(number)))
        .pipe(map(pokemons => this.pokemonTournamentService.simulateTournamentBattleForAll(pokemons)))
        .pipe(finalize(() =>
        {
          this.loading.set(false)
        }));
    })),
    { initialValue: [] }
  );

  private generateObservables(ids: number[]): Observable<any>[] {
    return ids.map(id => this.provider.getSinglePokemon(id));
  }

  public initPokemons(numberOfPokemons: number): void {
    this.numberOfPokemons$.next(numberOfPokemons);
  }
}


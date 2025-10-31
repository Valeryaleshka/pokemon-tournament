import {inject, Injectable, signal} from '@angular/core';
import {combineLatest, Observable, Subject, takeUntil} from 'rxjs';
import {generateUniquePokemonIds} from '../../../shared/helpers/pokemon.helpers';
import {PokemonProvider} from '../../../shared/providers/pokemon.provider';
import {PokemonTournamentService} from "../../../shared/services/pokemon-tournament.service";
import {ISortParams} from '../../../shared/types/common.types';
import {sortBy} from '../../../shared/helpers/sort.helper';

export const defaultPokemonSortState: ISortParams = {
  directionTitle: 'Ascending',
  direction: 'asc',
  valueTitle: 'Name',
  value: 'name'
};

@Injectable()
export class PokemonService {
  provider = inject(PokemonProvider);
  pokemonTournamentService = inject(PokemonTournamentService);

  private _pokemons = signal<any[]>([]);
  public readonly pokemons = this._pokemons.asReadonly();
  public loading = signal<boolean>(false);
  public currentSort = signal(defaultPokemonSortState)

  private destroy$ = new Subject<void>();

  private generateObservables(ids: number[]): Observable<any>[] {
    return ids.map(id => this.provider.getSinglePokemon(id));
  }

  public setCurrentSort(sort: ISortParams) {
    this.currentSort.set(sort);
    this.sortPokemons();
  }

  public initBattle() {
    this._pokemons.update(value => this.pokemonTournamentService.simulateTournamentBattleForAll(value))
  }

  private sortPokemons() {
    this._pokemons.update(value => sortBy(this.currentSort(), value))
  }

  public initPokemons(numberOfPokemons: number): void {
    this.destroy$.next();

    this.loading.set(true);

    combineLatest(this.generateObservables(generateUniquePokemonIds(numberOfPokemons)))
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (pokemonData) => {
          this.loading.set(false);
          this._pokemons.set(sortBy(this.currentSort(), pokemonData));
          this.initBattle();
        },
        error: (error) => {
          this.loading.set(false);
          console.error('Error loading pokemons:', error);
        }
      });
  }
}

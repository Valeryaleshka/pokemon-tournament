import {inject, Injectable, signal} from '@angular/core';
import {combineLatest, Observable, Subject, takeUntil} from 'rxjs';
import {generateUniquePokemonIds} from '../../../shared/helpers/pokemon.helpers';
import {PokemonProvider} from '../../../shared/providers/pokemon.provider';
import {PokemonTournamentService} from "../../../shared/services/pokemon-tournament.service";
import {ISortParams} from '../../../shared/types/common.types';
import {SortService} from '../../../shared/services/sort.service';

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
  sortService = inject(SortService);

  private _pokemons = signal<any[]>([]);
  public readonly pokemons = this._pokemons.asReadonly();
  public loading = signal<boolean>(false);
  public error = signal<string | null>(null);
  public currentSort = signal(defaultPokemonSortState)

  private destroy$ = new Subject<void>();

  private generateObservables(ids: number[]): Observable<any>[] {
    return ids.map(id => this.provider.getSinglePokemon(id));
  }

  public setCurrentSort(sort: ISortParams) {
    console.log(sort);
    this.currentSort.set(sort);
    this.sortPokemons();
  }

  public initBattle() {
    this._pokemons.update(value => this.pokemonTournamentService.simulateTournamentBattleForAll(value))
  }

  public resetWarriors() {
    this._pokemons.update(value => this.pokemonTournamentService.resetBattleStats(value))
  }

  private sortPokemons() {
    console.log(this.currentSort());
    this._pokemons.update(value => this.sortService.sortBy(this.currentSort(), value))
  }

  public initPokemons(numberOfPokemons: number): void {
    this.destroy$.next();

    this.loading.set(true);
    this.error.set(null);

    combineLatest(this.generateObservables(generateUniquePokemonIds(numberOfPokemons)))
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (pokemonData) => {
          console.log(pokemonData)
          this.loading.set(false);
          this._pokemons.set(this.sortService.sortBy(this.currentSort(), pokemonData));
          this.initBattle();
        },
        error: (error) => {
          this.loading.set(false);
          this.error.set('Failed to load pokemons');
          console.error('Error loading pokemons:', error);
        }
      });
  }
}

import {Routes} from '@angular/router';
import {Root} from './components/root/root';

export const routes: Routes = [
  {
    path: '',
    component: Root,
    children: [
      {path: '', pathMatch: 'full', redirectTo: '/pokemons'},
      {
        path: 'pokemons',
        title: 'Pokemons Tournament',
        loadComponent: () =>
          import('./pages/pokemons/pokemons-page.component').then(
            (m) => m.PokemonsPage,
          ),
      },
    ],
  }, {
    path: '**', redirectTo: '/pokemons'
  }
];

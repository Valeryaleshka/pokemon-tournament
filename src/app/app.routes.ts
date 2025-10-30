import {Routes} from '@angular/router';
import {Root} from './components/root/root';

export const routes: Routes = [
  {
    path: '',
    component: Root,
    children: [
      {path: '', pathMatch: 'full', redirectTo: '/main'},
      {
        path: 'main',
        loadComponent: () =>
          import('./pages/main/main').then(
            (m) => m.Main,
          ),
      },
    ]
  }
];

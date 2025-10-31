import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root-component',
  imports: [
    RouterOutlet
  ],
  standalone: true,
  templateUrl: './root.html',
  styleUrl: './root.less',
})
export class Root {

}

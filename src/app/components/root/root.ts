import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '@app/components/header/header';

@Component({
  selector: 'app-root-component',
  imports: [RouterOutlet, Header],
  templateUrl: './root.html',
  styleUrl: './root.less',
})
export class Root {}

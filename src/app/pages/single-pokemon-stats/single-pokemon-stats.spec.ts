import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePokemonStats } from './single-pokemon-stats';

describe('SinglePokemonStats', () => {
  let component: SinglePokemonStats;
  let fixture: ComponentFixture<SinglePokemonStats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SinglePokemonStats]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinglePokemonStats);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

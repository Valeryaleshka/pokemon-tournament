import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenLoader } from './screen-loader';

describe('ScreenLoader', () => {
  let component: ScreenLoader;
  let fixture: ComponentFixture<ScreenLoader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScreenLoader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScreenLoader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondHeader } from './second-header';

describe('SecondHeader', () => {
  let component: SecondHeader;
  let fixture: ComponentFixture<SecondHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecondHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

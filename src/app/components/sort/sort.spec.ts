import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SortComponent } from './sort';



describe('Sort', () => {
  let component: SortComponent;
  let fixture: ComponentFixture<SortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

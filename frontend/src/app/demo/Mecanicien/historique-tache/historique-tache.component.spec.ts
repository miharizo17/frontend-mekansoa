import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueTacheComponent } from './historique-tache.component';

describe('HistoriqueTacheComponent', () => {
  let component: HistoriqueTacheComponent;
  let fixture: ComponentFixture<HistoriqueTacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoriqueTacheComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriqueTacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

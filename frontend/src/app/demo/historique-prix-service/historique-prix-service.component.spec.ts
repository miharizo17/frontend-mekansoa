import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriquePrixServiceComponent } from './historique-prix-service.component';

describe('HistoriquePrixServiceComponent', () => {
  let component: HistoriquePrixServiceComponent;
  let fixture: ComponentFixture<HistoriquePrixServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoriquePrixServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriquePrixServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

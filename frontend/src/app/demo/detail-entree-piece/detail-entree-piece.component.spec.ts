import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEntreePieceComponent } from './detail-entree-piece.component';

describe('DetailEntreePieceComponent', () => {
  let component: DetailEntreePieceComponent;
  let fixture: ComponentFixture<DetailEntreePieceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailEntreePieceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailEntreePieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

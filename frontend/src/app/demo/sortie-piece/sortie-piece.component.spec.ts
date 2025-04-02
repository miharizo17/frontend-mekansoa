import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortiePieceComponent } from './sortie-piece.component';

describe('SortiePieceComponent', () => {
  let component: SortiePieceComponent;
  let fixture: ComponentFixture<SortiePieceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortiePieceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortiePieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

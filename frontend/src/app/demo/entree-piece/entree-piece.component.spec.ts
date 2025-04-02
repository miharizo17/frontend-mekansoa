import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntreePieceComponent } from './entree-piece.component';

describe('EntreePieceComponent', () => {
  let component: EntreePieceComponent;
  let fixture: ComponentFixture<EntreePieceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntreePieceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntreePieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

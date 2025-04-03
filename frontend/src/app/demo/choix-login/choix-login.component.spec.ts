import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoixLoginComponent } from './choix-login.component';

describe('ChoixLoginComponent', () => {
  let component: ChoixLoginComponent;
  let fixture: ComponentFixture<ChoixLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChoixLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoixLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

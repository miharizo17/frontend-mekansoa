import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvancementTacheComponent } from './avancement-tache.component';

describe('AvancementTacheComponent', () => {
  let component: AvancementTacheComponent;
  let fixture: ComponentFixture<AvancementTacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvancementTacheComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvancementTacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

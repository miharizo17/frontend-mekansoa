import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutClientComponent } from './logout-client.component';

describe('LogoutClientComponent', () => {
  let component: LogoutClientComponent;
  let fixture: ComponentFixture<LogoutClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoutClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoutClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

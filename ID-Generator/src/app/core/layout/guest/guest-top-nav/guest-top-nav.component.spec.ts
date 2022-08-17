import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestTopNavComponent } from './guest-top-nav.component';

describe('GuestTopNavComponent', () => {
  let component: GuestTopNavComponent;
  let fixture: ComponentFixture<GuestTopNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuestTopNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestTopNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

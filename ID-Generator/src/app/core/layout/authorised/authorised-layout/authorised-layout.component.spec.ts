import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorisedLayoutComponent } from './authorised-layout.component';

describe('AuthorisedLayoutComponent', () => {
  let component: AuthorisedLayoutComponent;
  let fixture: ComponentFixture<AuthorisedLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorisedLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorisedLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

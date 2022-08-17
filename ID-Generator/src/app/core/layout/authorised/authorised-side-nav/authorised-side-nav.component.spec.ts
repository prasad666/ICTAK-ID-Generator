import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorisedSideNavComponent } from './authorised-side-nav.component';

describe('AuthorisedSideNavComponent', () => {
  let component: AuthorisedSideNavComponent;
  let fixture: ComponentFixture<AuthorisedSideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorisedSideNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorisedSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

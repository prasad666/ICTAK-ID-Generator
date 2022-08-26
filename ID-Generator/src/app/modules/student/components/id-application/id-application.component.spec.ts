import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdApplicationComponent } from './id-application.component';

describe('IdApplicationComponent', () => {
  let component: IdApplicationComponent;
  let fixture: ComponentFixture<IdApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdApplicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

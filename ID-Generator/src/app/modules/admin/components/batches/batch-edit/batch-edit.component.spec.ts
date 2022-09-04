import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchEditComponent } from './batch-edit.component';

describe('BatchEditComponent', () => {
  let component: BatchEditComponent;
  let fixture: ComponentFixture<BatchEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

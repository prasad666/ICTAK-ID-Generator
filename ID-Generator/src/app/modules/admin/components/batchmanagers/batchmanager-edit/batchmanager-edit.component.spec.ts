import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchmanagerEditComponent } from './batchmanager-edit.component';

describe('BatchmanagerEditComponent', () => {
  let component: BatchmanagerEditComponent;
  let fixture: ComponentFixture<BatchmanagerEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchmanagerEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchmanagerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

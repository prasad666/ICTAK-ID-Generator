import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchManagerHomeComponent } from './batch-manager-home.component';

describe('BatchManagerHomeComponent', () => {
  let component: BatchManagerHomeComponent;
  let fixture: ComponentFixture<BatchManagerHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchManagerHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchManagerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchmanagerListComponent } from './batchmanager-list.component';

describe('BatchmanagerListComponent', () => {
  let component: BatchmanagerListComponent;
  let fixture: ComponentFixture<BatchmanagerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchmanagerListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchmanagerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

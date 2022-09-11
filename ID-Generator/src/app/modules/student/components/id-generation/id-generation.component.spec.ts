import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdGenerationComponent } from './id-generation.component';

describe('IdGenerationComponent', () => {
  let component: IdGenerationComponent;
  let fixture: ComponentFixture<IdGenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdGenerationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

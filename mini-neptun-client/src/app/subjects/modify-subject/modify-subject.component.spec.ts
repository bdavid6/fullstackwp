import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifySubjectComponent } from './modify-subject.component';

describe('ModifySubjectComponent', () => {
  let component: ModifySubjectComponent;
  let fixture: ComponentFixture<ModifySubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifySubjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifySubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

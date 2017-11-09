import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentSkillsComponent } from './department-skills.component';

describe('DepartmentSkillsComponent', () => {
  let component: DepartmentSkillsComponent;
  let fixture: ComponentFixture<DepartmentSkillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentSkillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

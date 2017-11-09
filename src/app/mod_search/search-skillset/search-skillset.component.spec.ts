import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSkillsetComponent } from './search-skillset.component';

describe('SearchSkillsetComponent', () => {
  let component: SearchSkillsetComponent;
  let fixture: ComponentFixture<SearchSkillsetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchSkillsetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSkillsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

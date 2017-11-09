import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAssociateComponent } from './search-associate.component';

describe('SearchAssociateComponent', () => {
  let component: SearchAssociateComponent;
  let fixture: ComponentFixture<SearchAssociateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchAssociateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAssociateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

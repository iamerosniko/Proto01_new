import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchLastworkedonComponent } from './search-lastworkedon.component';

describe('SearchLastworkedonComponent', () => {
  let component: SearchLastworkedonComponent;
  let fixture: ComponentFixture<SearchLastworkedonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchLastworkedonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchLastworkedonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

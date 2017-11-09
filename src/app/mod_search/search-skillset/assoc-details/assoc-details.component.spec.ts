import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssocDetailsComponent } from './assoc-details.component';

describe('AssocDetailsComponent', () => {
  let component: AssocDetailsComponent;
  let fixture: ComponentFixture<AssocDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssocDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssocDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

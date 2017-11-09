import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModTestExportComponent } from './mod-test-export.component';

describe('ModTestExportComponent', () => {
  let component: ModTestExportComponent;
  let fixture: ComponentFixture<ModTestExportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModTestExportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModTestExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

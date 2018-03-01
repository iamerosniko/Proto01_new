import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SelectModule } from 'ng2-select';
//components
import { SearchComponent } from './search.component';
import { SearchAssociateComponent } from './search-associate/search-associate.component';
import { DepartmentSkillsComponent } from './search-associate/department-skills/department-skills.component';
import { SearchSkillsetComponent } from './search-skillset/search-skillset.component';
import { AssocDetailsComponent } from './search-skillset/assoc-details/assoc-details.component';
import { SearchDepartmentComponent } from './search-department/search-department.component';
import { AssociateSkillsComponent } from './search-department/associate-skills/associate-skills.component';
import { SearchLastworkedonComponent } from './search-lastworkedon/search-lastworkedon.component';
//services
import { LocationSvc } from '../com_services/location.svc';
import { DepartmentSvc } from '../com_services/department.svc';
import { SkillsetSvc } from '../com_services/skillset.svc';
import { AssociateSvc } from '../com_services/associate.svc';
import { DepartmentSkillsetsSvc } from '../com_services/dept_skillset.svc';
import { AssociateDepartmentSkillsetsSvc } from '../com_services/assoc_dept_skillset.svc';
import { DataAssociateReport } from './data/data-associate.reports';
import { DataSkillsetReport } from './data/data-skillset.reports';
import { DataDepartmentReport } from './data/data-department.reports';
import { DataLastworkedonReport } from './data/data-lastworkedon.reports';
import { MaterialModule,MdDatepickerModule,MdNativeDateModule
   } from '@angular/material';

//material
@NgModule({
  //components area
  declarations: [
    SearchComponent,
    SearchAssociateComponent,
    DepartmentSkillsComponent,
    SearchSkillsetComponent,
    SearchDepartmentComponent,
    AssociateSkillsComponent,
    AssocDetailsComponent,
    SearchLastworkedonComponent
    //maintenance-route
  ],
  //module area
  imports: [
    BrowserModule,BrowserAnimationsModule,HttpModule,CommonModule,FormsModule,
    SelectModule,MaterialModule,
    MdNativeDateModule,
  ],
  //services area
  providers: [
    LocationSvc,DepartmentSvc,SkillsetSvc,AssociateSvc,
    DepartmentSkillsetsSvc,AssociateDepartmentSkillsetsSvc,
    //reports
    DataAssociateReport,DataSkillsetReport,DataDepartmentReport,DataLastworkedonReport
  ],
  //components to be shared and used using selector
  exports: [
    SearchComponent, MdDatepickerModule
    //maintenance-route
  ]
})
export class SearchModule { }

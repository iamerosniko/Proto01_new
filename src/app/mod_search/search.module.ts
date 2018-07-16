import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SearchRouting } from './search.routing';
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
import { 
  MatDatepickerModule,
  MatNativeDateModule,
  // MaterialModule,MdDatepickerModule,MdNativeDateModule
   } from '@angular/material';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProgressbarModule } from 'ngx-bootstrap';
import { ExcelService } from '../com_services/excel.service';

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
    ProgressbarModule.forRoot(),
    BrowserModule,BrowserAnimationsModule,HttpModule,CommonModule,FormsModule,
    SelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    // MaterialModule,MdNativeDateModule,
    NgxPaginationModule,
    SearchRouting
  ],
  //services area
  providers: [
    LocationSvc,DepartmentSvc,SkillsetSvc,AssociateSvc,
    DepartmentSkillsetsSvc,AssociateDepartmentSkillsetsSvc,
    //reports
    ExcelService,
    DataAssociateReport,DataSkillsetReport,DataDepartmentReport,DataLastworkedonReport
  ],
  //components to be shared and used using selector
  exports: [
    SearchComponent, 
    // MdDatepickerModule
    //maintenance-route
  ]
})
export class SearchModule { }

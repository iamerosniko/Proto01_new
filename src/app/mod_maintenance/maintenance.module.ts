import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaintenanceRouting } from './maintenance.routing';
//components
import { MaintenanceComponent } from './maintenance.component';
import { VWAssociateComponent } from './associate/vw_associate.component';
import { VWDepartmentComponent } from './department/vw_department.component';
import { VWDepartmentSkillsComponent } from './department_skills/vw_department_skills.component';
import { VWLocationComponent } from './location/vw_location.component';
import { VWSkillsetComponent } from './skillset/vw_skillset.component';
//common
import { CommonCompModule } from '../mod_common/common_comp.module';
//services
import { LocationSvc } from '../com_services/location.svc';
import { DepartmentSvc } from '../com_services/department.svc';
import { SkillsetSvc } from '../com_services/skillset.svc';
import { AssociateSvc } from '../com_services/associate.svc';
import { DepartmentSkillsetsSvc } from '../com_services/dept_skillset.svc';
import { AssociateDepartmentSkillsetsSvc } from '../com_services/assoc_dept_skillset.svc';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule } from 'ngx-bootstrap'
@NgModule({
  //components area
  declarations: [
    MaintenanceComponent,
    //maintenance-route
    VWAssociateComponent,VWDepartmentComponent,VWLocationComponent,VWSkillsetComponent,VWDepartmentSkillsComponent
  ],
  //module area
  imports: [
    ModalModule.forRoot(),
    BrowserModule,HttpModule,CommonModule,FormsModule,CommonCompModule,
    MaintenanceRouting,NgxPaginationModule
  ],
  //services area
  providers: [
    LocationSvc,DepartmentSvc,SkillsetSvc,AssociateSvc,
    DepartmentSkillsetsSvc,AssociateDepartmentSkillsetsSvc
  ],
  //components to be shared and used using selector
  exports: [
    MaintenanceComponent,
    //maintenance-route
    VWAssociateComponent,VWDepartmentComponent,VWLocationComponent,VWSkillsetComponent
  ]
})
export class MaintenanceModule { }

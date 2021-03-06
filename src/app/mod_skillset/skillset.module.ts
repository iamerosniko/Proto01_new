import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
//skillset
import { SkillSetComponent } from './skillset.component';
import { SkillSetRouting } from './skillset.routing';
import { CommonCompModule } from '../mod_common/common_comp.module';
import { CurrentUserSvc } from '../com_services/currentuser.svc';
import { AssociateSvc } from '../com_services/associate.svc';
import { LocationSvc } from '../com_services/location.svc';
import { DepartmentSvc } from '../com_services/department.svc';
import { SkillsetSvc } from '../com_services/skillset.svc';
import { DepartmentSkillsetsSvc } from '../com_services/dept_skillset.svc'
import { AssociateDepartmentSkillsetsSvc } from '../com_services/assoc_dept_skillset.svc';

@NgModule({
  declarations: [
    SkillSetComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    SkillSetRouting,
    CommonCompModule,
  ],
  providers: [
    CurrentUserSvc,
    AssociateSvc,
    LocationSvc,
    DepartmentSvc,
    SkillsetSvc,
    DepartmentSkillsetsSvc,
    AssociateDepartmentSkillsetsSvc
  ],
  exports: [
    SkillSetComponent
  ]
})

export class SkillsetModule { }
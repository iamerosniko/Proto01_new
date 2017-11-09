import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//component
import { MaintenanceComponent } from './maintenance.component';

import { VWAssociateComponent } from './associate/vw_associate.component';
import { VWDepartmentComponent } from './department/vw_department.component';
import { VWDepartmentSkillsComponent } from './department_skills/vw_department_skills.component';
import { VWLocationComponent } from './location/vw_location.component';
import { VWSkillsetComponent } from './skillset/vw_skillset.component';

const routes: Routes = [
    //paths
    {
      path : 'maintenance', component : MaintenanceComponent,
        children : [
            {
                path : 'Associates' , component : VWAssociateComponent, outlet : 'maintenance-route'
            },
            {
                path : 'Departments' , component : VWDepartmentComponent, outlet : 'maintenance-route'
            },
            {
                path : 'Locations' , component : VWLocationComponent, outlet : 'maintenance-route'
            },
            {
                path : 'Skillsets' , component : VWSkillsetComponent, outlet : 'maintenance-route'
            },
            {
                path : 'DepartmentSkills' , component : VWDepartmentSkillsComponent, outlet : 'maintenance-route'
            },
            { path: '', redirectTo: 'Locations', pathMatch: 'full' }
        ]
    }
];

 @NgModule ({
     imports: [ RouterModule.forChild(routes) ],
     exports: [ RouterModule ]
 })

export class MaintenanceRouting {}

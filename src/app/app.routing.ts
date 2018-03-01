import { NgModule,OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth-guard';

import { LoadItemsComponent } from './mod_common/load-items/load-items.component';

import { SkillSetComponent } from './mod_skillset/skillset.component';
import { SearchComponent } from './mod_search/search.component';
import { NoAccessComponent } from './mod_common/noaccess.component';
import { MaintenanceComponent } from './mod_maintenance/maintenance.component';

import { VWAssociateComponent } from './mod_maintenance/associate/vw_associate.component';
import { VWDepartmentComponent } from './mod_maintenance/department/vw_department.component';
import { VWDepartmentSkillsComponent } from './mod_maintenance/department_skills/vw_department_skills.component';
import { VWLocationComponent } from './mod_maintenance/location/vw_location.component';
import { VWSkillsetComponent } from './mod_maintenance/skillset/vw_skillset.component';

const appRoutes: Routes = [
    
    { path : '', redirectTo: '/loadAccess', pathMatch: 'full' },
    { path : 'skillset', component: SkillSetComponent, canActivate:[AuthGuard] },
    { path : 'loadAccess', component:LoadItemsComponent },
    { path : 'noaccess', component : NoAccessComponent },
    { path : 'maintenance', component : MaintenanceComponent, 
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
        ], canActivate:[AuthGuard]
    },
    { path: '**', redirectTo :'/loadAccess' },
];

@NgModule ({
    imports: [ RouterModule.forRoot(appRoutes, {useHash: true}) ],
    exports: [ RouterModule ]
})

export class AppRouting {}
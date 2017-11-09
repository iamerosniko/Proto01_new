import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//component
import { ModTestExportComponent } from './mod-test-export.component'
const routes: Routes = [
    //paths
    { path : 'testexport', component: ModTestExportComponent },
];

 @NgModule ({
     imports: [ RouterModule.forChild(routes) ],
     exports: [ RouterModule ]
 })

export class ModTestExportRouting {}
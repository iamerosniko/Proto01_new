import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//component
import { SkillSetComponent } from './skillset.component';
const routes: Routes = [
    //paths
    { path : 'skillset', component: SkillSetComponent },
];

 @NgModule ({
     imports: [ RouterModule.forChild(routes) ],
     exports: [ RouterModule ]
 })

export class SkillSetRouting {}
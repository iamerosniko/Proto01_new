import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//component
import { SearchComponent } from './search.component';
import { NoAccessComponent } from '../mod_common/noaccess.component';

const routes: Routes = [
    //paths
    {
      path : 'search', component : SearchComponent,
    },
    {
      path : 'noaccess', component : NoAccessComponent,
    }
];

 @NgModule ({
     imports: [ RouterModule.forChild(routes) ],
     exports: [ RouterModule ]
 })

export class SearchRouting {}

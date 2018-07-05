import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoadItemsComponent } from './mod_common/load-items/load-items.component';
const appRoutes: Routes = [
    
    { path: '', redirectTo: '/loadAccess', pathMatch: 'full' },
    { path: 'loadAccess', component:LoadItemsComponent}
];

@NgModule ({
    imports: [ RouterModule.forRoot(appRoutes, {useHash: true}) ],
    exports: [ RouterModule ]
})

export class AppRouting {}

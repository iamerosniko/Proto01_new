import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Ng2Datetime } from 'ng2-datetime-picker';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
// import { AppService } from './app.svc';EROS: i comment out this line because this is for simulation purposes only

import { Set_User_AccessSvc } from './com_services/set_user_access.svc';
import { LoginService } from './com_services/login.service';
import { ClientApiService } from './com_services/clientapi.service';
import { MyTokenSvc } from './com_services/mytoken.svc';
import { Set_GroupSvc } from './com_services/set_group.svc';
import { SkillsetModule } from './mod_skillset/skillset.module';
import { SearchModule } from './mod_search/search.module';
import { MaintenanceModule } from './mod_maintenance/maintenance.module';
//modules
import { CommonCompModule } from './mod_common/common_comp.module';
// import { TestExportModule } from './mod-test-export/mod-test-export.module';
import { LoadItemsComponent } from './mod_common/load-items/load-items.component';

import { AuthGuard } from './auth-guard';
@NgModule({
  //components area
  declarations: [
    AppComponent,
    LoadItemsComponent,
  ],
  //modules area
  imports: [
    BrowserModule,HttpModule,CommonModule,FormsModule,
    //component's module
    CommonCompModule,
    SkillsetModule,
    MaintenanceModule,
    SearchModule,
    AppRouting,
    // TestExportModule,
  ],
  //services area
  providers: [
    AuthGuard,LoginService,ClientApiService,
    Set_GroupSvc,Set_User_AccessSvc,MyTokenSvc
  ],
  //initial component to be rendered
  bootstrap: [AppComponent]
})
export class AppModule { }

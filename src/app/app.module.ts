import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgIdleModule } from '@ng-idle/core';
import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
// import { AppService } from './app.svc';EROS: i comment out this line because this is for simulation purposes only

import { MyTokenSvc } from './com_services/mytoken.svc';
import { BTAMSvc } from './com_services/btam.svc.';
import { SkillsetModule } from './mod_skillset/skillset.module';
import { SearchModule } from './mod_search/search.module';
import { MaintenanceModule } from './mod_maintenance/maintenance.module';
//modules
import { CommonCompModule } from './mod_common/common_comp.module';
// import { TestExportModule } from './mod-test-export/mod-test-export.module';
import { LoadItemsComponent } from './mod_common/load-items/load-items.component';
import { SkillsetMaintenanceServices } from './com_services/skillsetmaintenance.service';
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
    NgIdleModule.forRoot()
    // TestExportModule,
  ],
  //services area
  providers: [MyTokenSvc,BTAMSvc,SkillsetMaintenanceServices
  ],
  //initial component to be rendered
  bootstrap: [AppComponent]
})
export class AppModule { }

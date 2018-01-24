import { 
    Component,
    OnInit
} from '@angular/core';
import { Location } from '@angular/common';
import { Router,ActivatedRoute }  from '@angular/router';
import { Set_User,User,Set_User_Access,Set_Group } from './com_entities/entities';
import { CurrentUserSvc } from './com_services/currentuser.svc';
import { Set_UserSvc } from './com_services/set_user.svc';
import { Set_User_AccessSvc } from './com_services/set_user_access.svc';
import { MyTokenSvc } from './com_services/mytoken.svc';
import { Set_GroupSvc } from './com_services/set_group.svc';
import { Jsonp } from '@angular/http/src/http';
import { forEach } from '@angular/router/src/utils/collection';
import { Observable } from 'rxjs/Observable'
import { setTimeout } from 'timers';

@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  template:`
    <div class="navbar navbar-blue_2 navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" >Skillset Database</a>
        </div>
        <div class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            <li *ngIf="isVisible('Admin')" [ngClass]="{'active' : routeStr=='/search'}"><a href="#p1" data-toggle="tab" (click)="routeOnly('search')" class="lnk-search"><i class="fa fa-search"></i>&nbsp;Search</a></li>
            <li *ngIf="isVisible('Limited')" [ngClass]="{'active' : routeStr=='/skillset'}"><a href="#p2" (click)="routeOnly('skillset')" data-toggle="tab" class="lnk-skillset"><i class="fa fa-cogs"></i>&nbsp;Skillset</a></li>
            <li *ngIf="isVisible('Admin')" [ngClass]="{'active' : routeStr.includes('/maintenance')}"><a href="#p3" data-toggle="tab" (click)="routeOnly('maintenance')"  class="lnk-maintenance"><i class="fa fa-wrench"></i>&nbsp;Maintenance</a></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li><a href="#"><i class="fa fa-user-circle"></i><span>&nbsp;Hello, {{currentUser.FirstName + ' ' + currentUser.LastName }}!</span></a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="main-body">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: User= new User('','','','');
  routeStr:string='';
  private data: any;

  constructor(
    private curUserSvc: CurrentUserSvc,
    private useAccSvc: Set_User_AccessSvc,
    private groupSvc:Set_GroupSvc,
    private useSvc: Set_UserSvc,
    private router: Router,
    private route:ActivatedRoute,
    private location: Location,
    private myTokenSvc : MyTokenSvc,
  ){
    
    this.router.events.debounceTime(1000).subscribe(
      (val)=>{
        if(this.location.path() != ''){
          this.routeStr = this.location.path();
        } 
        else{
          this.routeStr='';
        }
        this.checkIfAuthenticated();
      }
    );
  }
  async getCurrentUserData() {
    this.currentUser = await this.curUserSvc.getCurrentUser();
    var tokens = await this.myTokenSvc.getTokens();
    
    tokens.forEach(el => {
      localStorage.setItem(el.TokenName,el.Token);
    });
  }

  async checkIfAuthenticated(){
  
    if(this.currentUser.FirstName==""){
      await this.getCurrentUserData();
      this.checkIfAuthenticated();
    }
    

    if(this.currentUser.Role=="Admin"){
      if(this.routeStr=="/search"||this.routeStr.indexOf('maintenance')==1){
       
      }
      else{
        await this.routeOnly('search');
      }
    }
    else if(this.currentUser.Role=="Limited")
      await this.routeOnly('skillset');
    else
      await this.routeOnly('noaccess');
  }


  routeOnly(path:string){
    this.router.navigate(['/'+path]);
  }
  
  isVisible(module:string):boolean{
    return this.currentUser.Role == module;
  }
}
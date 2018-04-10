import { 
    Component,
    OnInit,OnDestroy
} from '@angular/core';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';

import { Location } from '@angular/common';
import { Router,ActivatedRoute }  from '@angular/router';
import { Set_User,User,Set_User_Access,Set_Group,SignedInUser } from './com_entities/entities';
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
            <li><a><i class="fa fa-user-circle"></i><span>&nbsp;Hello, {{currentUser.FirstName + ' ' + currentUser.LastName }}!</span></a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="main-body">
      <router-outlet></router-outlet>
    </div>
    <a [hidden]="true" id="errorModalBtn" data-toggle="modal" href='#modal-id'>Trigger modal</a>
    <div class="modal fade" id="modal-id" data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog" style="overflow-y: initial;">
          <div class="modal-content">
            <br /><br />
            <p align="center" style="color: red"><strong>{{idleState}}</strong></p>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" (click)="reloadPage()" data-dismiss="modal">Refresh</button>
            </div>
          </div>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnDestroy{
  // currentUser: User= new User('','','','');
  currentUser: User= new User('','','','');
  routeStr:string='';
  private data: any;

  /*
    IDLE
    */
  public idleState = 'Not started.';
  private timedOut = false;
  private isIdle=false;
  private idleEndCount = 0;
  private idleStartCount = 0;
  private idleTimeoutCount = 0;
  private idleTimeoutWarningCount = 0;


  constructor(
    private curUserSvc: CurrentUserSvc,
    private useAccSvc: Set_User_AccessSvc,
    private groupSvc:Set_GroupSvc,
    private useSvc: Set_UserSvc,
    private router: Router,
    private route:ActivatedRoute,
    private location: Location,
    private myTokenSvc : MyTokenSvc,
    private idle: Idle
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
    this.isIdle = false;

    this.idle.setIdle(2);
    this.idle.setTimeout(5);
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
    
    idle.onIdleEnd.subscribe(() => {
      this.idleEndCount++;
      this.idleState = 'No longer idle.'
    });
    
    idle.onTimeout.subscribe(() => {
      this.idleTimeoutCount++;
      this.idleState = 'Your Session has timed out.';
      this.timedOut = true;
      document.getElementById('errorModalBtn').click();
    });
    
    idle.onIdleStart.subscribe(() => {
      this.idleStartCount++;
      this.idleState = 'You\'ve gone idle!'
    });
    
    idle.onTimeoutWarning.subscribe((countdown) => {
     
      this.idleTimeoutWarningCount++;
      this.idleState = 'You will time out in ' + countdown + ' seconds!'

    });
    
    this.reset();
  }

  ngOnDestroy() {
    this.idle.stop();
  }

  reloadPage(){
    location.reload();
  }

  reset() {

    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }

  //test
  async getSignedInUser(){
    var username = await this.curUserSvc.getSignedInUser();
    this.currentUser = await this.curUserSvc.getSignedInUser();
    var authenticationToken = await this.curUserSvc.GetAuthenticationToken(username);
    var authorizationToken = await this.curUserSvc.GetAuthorizationToken(authenticationToken);

    console.log(username);
    console.log(authenticationToken);
    console.log(authorizationToken);
    console.log(this.currentUser);

    localStorage.setItem("AuthToken",authenticationToken.Token);
    localStorage.setItem("ApiToken", authorizationToken.Token);
  }

  // async getCurrentUserData() {
  //   this.currentUser = await this.curUserSvc.getCurrentUser();
  //   var tokens = await this.myTokenSvc.getTokens();
    
  //   tokens.forEach(el => {
  //     localStorage.setItem(el.TokenName,el.Token);
  //   });
  // }

  async checkIfAuthenticated(){
  
    if(this.currentUser.FirstName==""){
      await this.getSignedInUser();
      await this.checkIfAuthenticated();
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
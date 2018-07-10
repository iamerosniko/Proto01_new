import { 
    Component,
   OnDestroy
} from '@angular/core';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';

import { Location } from '@angular/common';
import { Router,ActivatedRoute }  from '@angular/router';
import { User } from './com_entities/entities';
import { CurrentUserSvc } from './com_services/currentuser.svc';
import { MyTokenSvc } from './com_services/mytoken.svc';
import { BTAMSvc } from './com_services/btam.svc.';

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
    <a [hidden]="true" id="sessiontimeout" data-toggle="modal" href='#modal-sessiontimeout'>Trigger modal</a>
    <div class="modal fade" id="modal-sessiontimeout" data-backdrop="static" data-keyboard="false">
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
  currentUser: User= new User('','','','','');
  routeStr:string='';
  /*
    IDLE
    */
  public idleState = 'Not started.';
  public timedOut = false;
  public isIdle=false;
  public idleEndCount = 0;
  public idleStartCount = 0;
  public idleTimeoutCount = 0;
  public idleTimeoutWarningCount = 0;


  constructor(
    private curUserSvc: CurrentUserSvc,
    private router: Router,
    private location: Location,
    private idle: Idle,
    private btamSvc:BTAMSvc
  ){
    
    this.router.events.debounceTime(1000).subscribe(
       ()=>{
        if(this.location.path() != ''){
          this.routeStr =  this.location.path();
        } 
        else{
          this.routeStr= '';
        }
         this.checkIfAuthenticated();
      }
    );
    this.isIdle = false;

    this.idle.setIdle(900);
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
      sessionStorage.clear();
      document.getElementById('sessiontimeout').click();
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
    //original
    // var user = await this.curUserSvc.getSignedInUser();
    // console.log(user);
    var user =  {UserID: "", UserName: "alverer@mfcgd.com", FirstName: "", LastName: "", Role: "NoAccess"}
    var btamURL=await this.btamSvc.getBTAMURL();
    sessionStorage.setItem("BTAM_URL",btamURL.BTAMURL)

    this.currentUser = await this.curUserSvc.GetUserRolesFromBtam(user.UserName); 
    var authenticationToken = await this.curUserSvc.GetAuthenticationTokenFromBtam(this.currentUser);
    var authorizationToken = await this.curUserSvc.GetAuthorizationToken(authenticationToken);
  // this.currentUser.Role="Limited"
    // console.log(user);    
    // await console.log(this.currentUser);
    // console.log(authenticationToken);
    // console.log(authorizationToken);

    sessionStorage.setItem("AuthToken",authenticationToken.Token);
    sessionStorage.setItem("ApiToken", authorizationToken.Token);
  }

  async checkIfAuthenticated(){
  
    if(this.currentUser.FirstName==""){
      await this.getSignedInUser();
      await this.checkIfAuthenticated();
    }
    
    if(sessionStorage.getItem('AuthToken')==''){
      await this.routeOnly('noaccess');
    }
    else{
      if(this.currentUser.Role=="Admin"){
        if(this.routeStr=="/search"||this.routeStr.indexOf('maintenance')==1){
         
        }
        else{
          await this.routeOnly('search');
        }
      }
      else if(this.currentUser.Role=="Limited")
        await this.routeOnly('skillset');
      else{}
    }
    
  }


  routeOnly(path:string){
    this.router.navigate(['/'+path]);
  }
  
  isVisible(module:string):boolean{
    return this.currentUser.Role == module;
  }
}
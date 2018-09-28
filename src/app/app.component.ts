import {  Component, OnDestroy} from '@angular/core';

import { Location } from '@angular/common';
import { Router,ActivatedRoute }  from '@angular/router';
import { User } from './com_entities/entities';
import { CurrentUserSvc } from './com_services/currentuser.svc';
import { BTAMSvc } from './com_services/btam.svc.';
import { SkillsetMaintenanceServices } from './com_services/skillsetmaintenance.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnDestroy{
  currentUser: User= new User('','','','','');
  routeStr:string='';

  constructor(
    private curUserSvc: CurrentUserSvc,
    private router: Router,
    private location: Location,
    private btamSvc:BTAMSvc,
    private activatedroute :ActivatedRoute,
    private maintenanceSvc :SkillsetMaintenanceServices
  ){
    
    // this.router.events.debounceTime(500).subscribe(
    //   async ()=>{
    //     if(this.location.path() != ''){
    //       this.routeStr =  this.location.path();
    //     } 
    //     else{
    //       this.routeStr= '';
    //     }
    //     this.checkIfAuthenticated();
    //     await this.maintenanceSvc.cleanme();

    //   }
    // );
    this.activatedroute.params.subscribe(async ()=>{
      if(this.location.path() != ''){
        this.routeStr =  this.location.path();
      } 
      else{
        this.routeStr= '';
      }
      this.checkIfAuthenticated();
      await this.maintenanceSvc.cleanme();
    });
  }

  ngOnDestroy() {
  }

  async getSignedInUser(){
    //original
    var user = await this.curUserSvc.getSignedInUser();
    // console.log(user); 
    // var user =  {UserID: "", UserName: "alverer@mfcgd.com", FirstName: "", LastName: "", Role: "NoAccess"}
    var btamURL=await this.btamSvc.getBTAMURL();
    sessionStorage.setItem("BTAM_URL",btamURL.BTAMURL)

    this.currentUser = await this.curUserSvc.GetUserRolesFromBtam(user.UserName); 
    if(this.currentUser==null){
      this.currentUser = {UserID: "", UserName: "NoAccess", FirstName: "", LastName: "", Role: "NoAccess"}
    }
    else{
      var authenticationToken = await this.curUserSvc.GetAuthenticationTokenFromBtam(this.currentUser);
      var authorizationToken = await this.curUserSvc.GetAuthorizationToken(authenticationToken);
      // this.currentUser.Role="Limited"
      sessionStorage.setItem("AuthToken",authenticationToken.Token);
      sessionStorage.setItem("ApiToken", authorizationToken.Token);
    }
  }

  async checkIfAuthenticated(){
  
    if(this.currentUser.UserName==""){
      await this.getSignedInUser();
      await this.checkIfAuthenticated();
    }
    
    if(this.currentUser.Role=="NoAccess"||this.currentUser.Role==""){
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

  // remove unnecessary items in skillset

}
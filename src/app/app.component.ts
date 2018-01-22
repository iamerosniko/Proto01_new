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
import { Set_GroupSvc } from './com_services/set_group.svc';
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
            <li *ngIf="isVisible('')" [ngClass]="{'active' : routeStr=='/search'}"><a href="#p1" data-toggle="tab" (click)="routeOnly('search')" class="lnk-search"><i class="fa fa-search"></i>&nbsp;Search</a></li>
            <li *ngIf="isVisible('skillset')" [ngClass]="{'active' : routeStr=='/skillset'}"><a href="#p2" (click)="routeOnly('skillset')" data-toggle="tab" class="lnk-skillset"><i class="fa fa-cogs"></i>&nbsp;Skillset</a></li>
            <li *ngIf="isVisible('')" [ngClass]="{'active' : routeStr.includes('/maintenance')}"><a href="#p3" data-toggle="tab" (click)="routeOnly('maintenance')"  class="lnk-maintenance"><i class="fa fa-wrench"></i>&nbsp;Maintenance</a></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li><a href="#"><i class="fa fa-user-circle"></i><span *ngIf="user!=null">&nbsp;Hello, {{fullName}}!</span></a></li>
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
  currentUser: User= new User('','','');
  currentRole:number=0;
  user: Set_User;
  users:Set_User[];
  userAccess:Set_User_Access[]=[];
  group:Set_Group[]=[];
  fullName: string;
  routeStr:string='';
  //adminside//
  adminRoutes=[{route:'/search'},{route:'/maintenance'}];
  //associateside//
  commonRoutes=[{route:'/skillset'}];
  public 
  constructor(
    private curUserSvc: CurrentUserSvc,
    private useAccSvc: Set_User_AccessSvc,
    private groupSvc:Set_GroupSvc,
    private useSvc: Set_UserSvc,
    private router: Router,
    private route:ActivatedRoute,
    private location: Location,
  ){
    this.router.events.debounceTime(100).subscribe((val)=>{
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
    
    console.log(this.currentUser)
    // this.users = await this.useSvc.getSet_Users();
    // if(this.currentUser!=null){
    //   this.user = await this.users.find(user => user.user_name == this.currentUser.UserName);
    //   this.fullName = this.user.user_first_name + ' ' + this.user.user_last_name;
    // }
    // this.curUserSvc = await null;
    // this.useSvc = await null;
  }

  async getGroupAccess():Promise<number>{
    // no access = 0 //admin =1 //user=2
    var currentRole=0; 
    var adminDetails:Set_Group,normaluserDetails:Set_Group,noaccessDetails:Set_Group;
    this.group=await this.groupSvc.getSet_Groups();
    if(this.user!=null){
      adminDetails=await this.group.find(x=>x.grp_id=='GRP-2017626-001');
      normaluserDetails=await this.group.find(x=>x.grp_id=='GRP-2017626-002');
      noaccessDetails=await this.group.find(x=>x.grp_id=='GRP-2017626-003');
      this.userAccess=await this.useAccSvc.getSet_Users_Accesses();
      this.userAccess=await this.userAccess.filter(x=>x.user_id==this.user.user_id);
    }
    
    if(this.routeStr=='/' || this.routeStr==''){
      this.routeOnly('loadAccess');
    }

    if(this.userAccess.filter(x=>x.grp_id==adminDetails.grp_id).length==1){
      currentRole=1;
    }
    else if(this.userAccess.filter(x=>x.grp_id==normaluserDetails.grp_id).length==1){
      currentRole=2;
    }
    else{
      currentRole=0;
    }
      //this will determine if admin or user 
      // (this.userAccess.length==2) 
      // ? currentRole=1 
      // : currentRole=2// added as user and admin but the prio is admin
   
    this.currentRole=currentRole;

    return new Promise<number>((resolve)=>{
      resolve(currentRole)
    });
  }

  ngOnInit(): void {
    //this.getCurrentUserData();
  }
  
  // async checkIfAuthenticated_Old(){
  //   var isBelong=await this.getGroupAccess();
  //   //await console.log('last route:'+this.routeStr);
  //   var a = await this.adminRoutes.filter(x=>x.route.includes(this.routeStr)||this.routeStr.includes(x.route));
  //   var c = await this.commonRoutes.filter(x=>x.route.includes(this.routeStr));

  //     if(this.routeStr=='/maintenance'){
  //       this.router.navigate(['/maintenance', {outlets: {'maintenance-route': ['Locations']}}]);
  //     }



  //     if(isBelong==1){  
  //       if(a.length==0){
  //         await this.routeOnly('search');
  //       }
  //     }
  //     else if(isBelong==2){
  //       if(c.length==0){
  //         await this.routeOnly('skillset');
  //       }
  //     }
  //     else{
  //       await this.routeOnly('noaccess');
  //     }
    
   
  // }

  async checkIfAuthenticated(){
   

    if(this.currentUser.firstName==""){
      await this.getCurrentUserData();
      this.checkIfAuthenticated();
    }

    console.log(this.currentUser.role);
      if(this.currentUser.role=="admin"){  
        
        await this.routeOnly('search');
      }
      else if(this.currentUser.role=="Limited"){
        console.log('here')
        await this.routeOnly('skillset');
        
      }
      else{
        await this.routeOnly('noaccess');
      }
    
   
  }


  routeOnly(path:string){
      this.router.navigate(['/'+path]);
  }
  
  isVisible(module:string):boolean{
    var isVisible=false;
    //search is for admin
    if(this.currentRole>0){
      if(this.currentRole==1){
        isVisible=module!='skillset';
      }
      else{
        isVisible=module=='skillset';
      }
      return isVisible;
    }
    else return isVisible;
  }
}

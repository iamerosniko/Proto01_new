import { Component,OnInit } from '@angular/core';
import { Set_User, Associate, Department, Location } from '../../com_entities/entities';
import { AssociateSvc } from '../../com_services/associate.svc';
import { DepartmentSvc } from '../../com_services/department.svc';
import { LocationSvc } from '../../com_services/location.svc';
import { Set_UserSvc } from '../../com_services/set_user.svc';
@Component({
  moduleId: module.id,
  selector: 'vw-asssoc',
  templateUrl: 'vw_associate.component.html',
})
export class VWAssociateComponent implements OnInit {
  constructor(
    private associateSvc:AssociateSvc,
    private departmentSvc:DepartmentSvc,
    private locationSvc:LocationSvc,
    private setUserSvc:Set_UserSvc
  ){

  }
  p: number = 1;
  set_Users:Set_User[]=[];
  associates:Associate[]=[];
  associate:Associate=new Associate(0,'','',false,-1,-1,new Date,true);
  locations:Location[]=[];
  departments:Department[]=[];

  mode:number=0;//1 if update 0 if new entry
  
  ngOnInit(){
    this.cleanUp();
  }
  
  async getDependencies(){
    this.locations = await this.locationSvc.getLocations();
    this.departments = await this.departmentSvc.getDepartments();
    this.associates = await this.associateSvc.getAssociates();
    this.set_Users = await this.setUserSvc.getSet_Users();
  }

  getActiveDepartments():Department[]{
    let tempDept:Department[]=this.departments.filter(x=>x.IsActive==true);
    return tempDept;
  }

  getActiveLocations():Location[]{
    let tempLocation:Location[]=this.locations.filter(x=>x.IsActive==true);
    return tempLocation;
  }

  getUnusedUsers():Set_User[]{
    let tempUsers:Set_User[]=this.set_Users;
    for(var i=0; i<this.associates.length; i++){
      var assoc=this.associates[i];
      tempUsers=tempUsers.filter(x=>x.user_name!=assoc.UserName);
    }
    return tempUsers;
  }

  getDepartmentName(id:number):string{
    let department:Department = this.departments.find(x=>x.DepartmentID==id);
    return department.DepartmentDescr;
  }

  getLocationName(id:number):string{
    let location:Location = this.locations.find(x=>x.LocationID==id);
    return location.LocationDescr;
  }

  getStatus(status:boolean):string{
    return status ? "Yes" : "No";
  }

  getFullName(username:string):string{
    let setUser:Set_User = this.set_Users.find(x=>x.user_name==username);
    return setUser!=null ? setUser.user_first_name+ " " + setUser.user_last_name : username;
  }

  editDetails(assoc : Associate){
    this.mode=1;
    //get detail
    this.getDetails(assoc);
  }

  getDetails(assoc : Associate){
    this.associate = assoc;
  }

  changeStatus(assoc:Associate){
    this.getDetails(assoc);
    this.mode=1;
    this.associate.IsActive=false;
    this.saveAssociate();
  }

  cleanUp(){
    this.getDependencies();
    this.associate=new Associate(0,'','',false,-1,-1,new Date,true);
  }

  async saveAssociate(){
    if(this.entryValidation()){
      this.associate.UpdatedOn=new Date();
      this.mode==0 ?
      ( 
        await this.associateSvc.postAssociate(this.associate),
        alert("New Record has been successfully added.") 
      ) :
      ( 
        await this.associateSvc.putAssociate(this.associate),
        alert("Record has been successfully updated.")
      );
      document.getElementById("btnGoBack").click();
      this.goBack();
      
    }
  }

  entryValidation():boolean{
    var msg='';
    let tempDept:Department[] = this.getActiveDepartments();
    let tempLoc:Location[] = this.getActiveLocations();
    tempDept=tempDept.filter(x=>x.DepartmentID==this.associate.DepartmentID);
    tempLoc=tempLoc.filter(x=>x.LocationID==this.associate.LocationID);
    tempDept==null || tempDept.length==0 ? msg+='Department is Required.\n' : null ;
    tempLoc==null || tempLoc.length==0 ? msg+='Location is Required.\n' : null ;
    this.associate.UserName=='' ? msg+='Name is Required.':null;
    return msg==''?(true):(alert(msg),false);
  }

  goBack(){
    this.mode=0;
    this.cleanUp();
  }
}

import { Component,OnInit } from '@angular/core';
import { Set_User, Associate, Department, Location, User } from '../../com_entities/entities';
import { AssociateSvc } from '../../com_services/associate.svc';
import { DepartmentSvc } from '../../com_services/department.svc';
import { LocationSvc } from '../../com_services/location.svc';
// import { Set_UserSvc } from '../../com_services/set_user.svc';
import { CurrentUserSvc } from '../../com_services/currentuser.svc';

 
@Component({
  moduleId: module.id,
  selector: 'vw-asssoc',
  templateUrl: 'vw_associate.component.html',
  styles:[`
  .modal {
    text-align: center;
    padding: 0!important;
  }
  
  .modal:before {
    content: '';
    display: inline-block;
    height: 100%;
    vertical-align: middle;
    margin-right: -4px;
  }
  
  .modal-dialog {
    display: inline-block;
    text-align: left;
    vertical-align: middle;
  }`]
})
export class VWAssociateComponent implements OnInit {

  constructor(
    private associateSvc:AssociateSvc,
    private departmentSvc:DepartmentSvc,
    private locationSvc:LocationSvc,
    private currentUserSvc : CurrentUserSvc
    // private setUserSvc:Set_UserSvc
  ){

  }
  loading:boolean=false;
  p: number = 1;
  // set_Users:Set_User[]=[];
  users:User[]=[];
  associates:Associate[]=[];
  associate:Associate=new Associate();
  locations:Location[]=[];
  departments:Department[]=[];
  message:string="";
  mode:number=0;//1 if update 0 if new entry
  
  ngOnInit(){
    this.cleanUp();
  }
  
  getUserName():string{
    return this.users.find(x=>x.UserID== this.associate.UserID).UserName
  }

  async getDependencies(){
    this.loading= await true;
    this.users = await this.currentUserSvc.GetUserInAppFromBtam();
    this.locations = await this.locationSvc.getLocations();
    this.departments = await this.departmentSvc.getDepartments();
    this.associates = await this.associateSvc.getAssociates();
    this.loading=false;
  }

  getActiveDepartments():Department[]{
    let tempDept:Department[]=this.departments.filter(x=>x.IsActive==true);
    return tempDept;

  }

  getActiveLocations():Location[]{
    let tempLocation:Location[]=this.locations.filter(x=>x.IsActive==true);
    return tempLocation;
  }
  
  getUnusedUsers():User[]{
    let tempUsers:User[]=this.users;
    for(var i=0; i<this.associates.length; i++){
      var assoc=this.associates[i];
      tempUsers=tempUsers.filter(x=>x.UserID!=assoc.UserID);
    }
    return tempUsers;
  }


  getDepartmentName(id:number):string{
    let department:Department = this.departments.find(x=>x.DepartmentID==id);
    if(department.IsActive==false){
      return "Department no longer active. Please Update Immediately"
    }
    return department.DepartmentDescr;
  }

  getLocationName(id:number):string{
    let location:Location = this.locations.find(x=>x.LocationID==id);
    if(location.IsActive==false){
      return "Location no longer active. Please Update Immediately"
    }
    return location.LocationDescr;
  }

  getStatus(status:boolean):string{
    return status ? "Yes" : "No";
  }

  getFullName(userID:string):string{
    let user:User = this.users.find(x=>x.UserID==userID);
    return user!=null ? user.FirstName+ " " + user.LastName : userID;
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

  async deleteAssociate(assoc:Associate){
    if(confirm("Are you sure you want to delete "+assoc.FullName+"?")){
      var associate = await this.associateSvc.DeleteAssociate(assoc.AssociateID);
      console.log(associate);
      if(associate!=null){
        this.message="Associate has been successfully deleted.";
        document.getElementById('assocModalbtn').click();
      }
      this.goBack();
    }
  }

  cleanUp(){
    this.associates=[];
    this.getDependencies();
    this.associate=new Associate();
  }

  async saveAssociate(){
    if(this.entryValidation()){
      this.associate.UpdatedOn=new Date();
      this.mode==0 ?
      ( 
        await this.associateSvc.postAssociate(this.associate),
        this.message="New Record has been successfully added.",
        document.getElementById('assocModalbtn').click()
      ) :
      ( 
        await this.associateSvc.putAssociate(this.associate),
        this.message="Record has been successfully updated.",
        document.getElementById('assocModalbtn').click()
      );
    }
  }

  btnClose(){
    document.getElementById("btnGoBack").click();
    this.goBack();
  }

  entryValidation():boolean{
    var msg='';
    let tempDept:Department[] = this.getActiveDepartments();
    let tempLoc:Location[] = this.getActiveLocations();
    tempDept=tempDept.filter(x=>x.DepartmentID==this.associate.DepartmentID);
    tempLoc=tempLoc.filter(x=>x.LocationID==this.associate.LocationID);
    tempDept==null || tempDept.length==0 ? msg+='Department is Required.\n' : null ;
    tempLoc==null || tempLoc.length==0 ? msg+='Location is Required.\n' : null ;
    this.associate.UserID=='' ? msg+='Name is Required.':null;
    return msg==''?(true):(alert(msg),false);
  }

  goBack(){
    this.mode=0;
    this.cleanUp();
  }
}

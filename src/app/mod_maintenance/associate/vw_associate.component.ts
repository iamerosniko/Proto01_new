import { Component,OnInit } from '@angular/core';
import {  Associate, Department, Location, User , AssTmp} from '../../com_entities/entities';
import { AssociateSvc } from '../../com_services/associate.svc';
import { DepartmentSvc } from '../../com_services/department.svc';
import { LocationSvc } from '../../com_services/location.svc';
import { CurrentUserSvc } from '../../com_services/currentuser.svc';
import { ExcelService } from '../../com_services/excel.service';
 
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
  notUpdated:boolean;

  constructor(
    private associateSvc:AssociateSvc,
    private departmentSvc:DepartmentSvc,
    private locationSvc:LocationSvc,
    private currentUserSvc : CurrentUserSvc,
    private excelService: ExcelService
  ){

  }
  loading:boolean=false;
  p: number = 1;
  items:number=20;
  filterDept:number = -1;
  // set_Users:Set_User[]=[];
  users:User[]=[];
  associates:AssTmp[]=[];
  associate:AssTmp={};
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
    this.associates =<AssTmp[]> await this.associateSvc.getAssociates();
    //update associates that is new in btam
    await this.addAssociateToDefault();
    this.loading=false;
  }

  async addAssociateToDefault(){
    var tempUsers:User[]=await this.users;
    var tempAssoc:Associate[] = [];

    this.associates.forEach(async assoc => {
      tempUsers= tempUsers.filter(x=>x.UserID!=assoc.UserID);
    });

    tempUsers.forEach(async user => {
      var assocTemp:AssTmp = {
        DepartmentID:0,
        FullName:user.FirstName+' '+user.LastName,
        LocationID:0,
        IsActive:true,
        PhoneNumber:'0',
        UserID:user.UserID,
        UpdatedOn:new Date(),
        VPN:false
      }
      tempAssoc.push( assocTemp);
    });

    tempUsers.length>0 ? await this.associateSvc.postAssociates(tempAssoc) : null;
    this.associates = await [];
    this.associates = await this.associateSvc.getAssociates();
    await this.RefreshAssociates();

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
    if(id==0){
      return "Department no longer active. Please Update Immediately"
    }
    else{
      let department:Department = this.departments.find(x=>x.DepartmentID==id);
      if(!department){
        return "Department no longer active. Please Update Immediately"
      }
      else return department.DepartmentDescr;
    }
  }

  getLocationName(id:number):string{
    if(id==0){
      return "Location no longer active. Please Update Immediately"
    }
    else{
      let location:Location = this.locations.find(x=>x.LocationID==id);
      if(!location){
        return "Location no longer active. Please Update Immediately"
      }
      else return location.LocationDescr;
    }
  }

  getStatus(status:boolean):string{
    return status ? "Yes" : "No";
  }

  editDetails(assoc : Associate){
    this.mode=1;
    //get detail
    this.getDetails(assoc);
  }

  getDetails(assoc : Associate){
    this.associate = assoc;
    this.notUpdated = assoc.DepartmentID==0 ||assoc.LocationID==0 ? true : false;
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
      // console.log(associate);
      if(associate!=null){
        this.message="Associate has been successfully deleted.";
        document.getElementById('assocModalbtn').click();
      }
      this.goBack();
    }
  }

  async cleanUp(){
    this.associate=await new Associate();
    this.associates=await [];
    await this.getDependencies();
  }

  async saveAssociate(){
    if(this.entryValidation()){
      this.associate.UpdatedOn=new Date();
      this.associate.TransferDate=new Date(this.associate.TransferDate);
      this.associate.StartDate=new Date(this.associate.StartDate);

      console.log(this.associate);
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

  async btnClose(){
    document.getElementById("btnGoBack").click();
    await this.goBack();
  }

  entryValidation():boolean{
    var msg='';

    var tempDept=this.departments.filter(x=>x.DepartmentID==this.associate.DepartmentID);
    var tempLoc=this.locations.filter(x=>x.LocationID==this.associate.LocationID);
    tempDept==null || tempDept.length==0 ? msg+='Department is Required.\n' : null ;
    tempLoc==null || tempLoc.length==0 ? msg+='Location is Required.\n' : null ;
    this.associate.UserID=='' ? msg+='Name is Required.':null;
    return msg==''?(true):(alert(msg),false);
  }

  async goBack(){
    this.mode=0;
    await this.cleanUp();
  }

  exportAssociates(){
    var toExport:any[]=[];
    this.associates.forEach(element => {
      var assoc = {"Associate":element.FullName,
        "VPN" : element.VPN?'Yes':'No',
        "Location" : this.getLocationName(element.LocationID),
        "Department":this.getDepartmentName(element.DepartmentID),
        "Phone Number":element.PhoneNumber, 
      }
      toExport=toExport.concat(assoc);
    });

    this.excelService.exportAsExcelFile(toExport, "Associates");          
  }

  async RefreshAssociates(){
    this.associates= await this.associateSvc.getAssociates();
    this.associates=this.associates.filter(x=>x.IsActive==true && this.filterDept>-1 ? x.DepartmentID == this.filterDept : true);
  }
}

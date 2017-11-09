import { Component } from '@angular/core';
import { LocationSvc } from '../../com_services/location.svc';
import { Location } from '../../com_entities/entities';
@Component({
  moduleId: module.id,
  selector: 'vw-location',
  templateUrl: 'vw_location.component.html',
})
export class VWLocationComponent {
  constructor(private locSvc:LocationSvc){
    this.goBack();
  }
  p: number = 1;
  viewMode : number = 0;
  location : Location = new Location(0,'',true);
  locations: Location[] = [];
  mode:number=0;
  newDetails(){
    this.location=new Location(0,'',true);
  }

  editDetails(loc: Location){
    this.viewMode=1;
    this.mode=1;
    //get detail
    this.getDetails(loc);
  }

  getDetails(loc : Location){
    this.location = loc;
  }

  getStatus(status:boolean):string{
    return status ? "Yes" : "No";
  }

  changeStatus(loc:Location){
    this.getDetails(loc);
    this.viewMode=1;
    this.location.IsActive=false;
    this.saveLocation();
  }

  goBack(){
    this.location=new Location(0,'',true);
    this.getLocations();
    this.mode=0;
  }

  async saveLocation(){
    if(this.entryValidation()){
      this.viewMode==0 ?
        ( 
          await this.locSvc.postLocation(this.location),
          alert("New Record has been successfully added.") 
        ) :
        ( 
          this.locSvc.putLocation(this.location),
          alert("Record has been successfully updated.")
        );
      document.getElementById("btnGoBack").click();
      this.goBack();
    }
  }

  entryValidation():boolean{
    var msg='';
    this.location.LocationDescr.trim()=='' ? msg+='Location Description is Required.\n' : null ;
    return msg==''?(true):(alert(msg),false);
  }
  
  async getLocations(){
    this.locations=await this.locSvc.getLocations();
  }
}

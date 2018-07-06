
import { Injectable } from '@angular/core';
//services
import { SkillsetSvc } from '../../com_services/skillset.svc';
import { DepartmentSvc } from '../../com_services/department.svc';
import { AssociateSvc } from '../../com_services/associate.svc';
import { LocationSvc } from '../../com_services/location.svc';
import { CurrentUserSvc } from '../../com_services/currentuser.svc';
// import { Set_UserSvc } from '../../com_services/set_user.svc';
import { DepartmentSkillsetsSvc } from '../../com_services/dept_skillset.svc';
import { AssociateDepartmentSkillsetsSvc } from '../../com_services/assoc_dept_skillset.svc';
//entities
import { Location,Department,Skillset,
  Associate,
  AssociateDepartmentSkillset,DepartmentSkillsets1,
  //skillsetReport
  SkillsetRpt,AssociateDetails,
} from '../../com_entities/entities';

@Injectable()
export class DataSkillsetReport {
    constructor(
        private associateSvc:AssociateSvc,
        private departmentSvc:DepartmentSvc,
        private locationSvc:LocationSvc,
        private skillsetSvc:SkillsetSvc,
        private currentUserSvc:CurrentUserSvc,        
        // private setUserSvc:Set_UserSvc,
        private departmentSkillsetSvc:DepartmentSkillsetsSvc,
        private assocDeptSkillsetSvc:AssociateDepartmentSkillsetsSvc,
    ){

    }
    associates:AssociateDetails[]=[];
    skillsetRpt:SkillsetRpt;

    allDepartmentSkillsets:DepartmentSkillsets1[]=[];
    allAssociateDepartmentSkillset:AssociateDepartmentSkillset[]=[];
    allAssociates:Associate[]=[];
    allDepartments:Department[]=[];
    allLocations:Location[]=[];
    allSkillsets:Skillset[]=[];

    async getDependencies(){
        this.allAssociateDepartmentSkillset=await this.assocDeptSkillsetSvc.getAssociateDeptSkillsets();
        this.allDepartments=await this.departmentSvc.getDepartments();
        this.allAssociates=await this.associateSvc.getAssociates();
        this.allDepartmentSkillsets=await this.departmentSkillsetSvc.getDepartmentSkillsets();
        this.allLocations=await this.locationSvc.getLocations();
        this.allSkillsets=await this.skillsetSvc.getSkillsets();
    }

    getDateString(myDate:Date):string{
        var dateStr:string='';
        var dd:number = myDate.getDate();
        var mm = myDate.getMonth()+1; //January is 0!

        var yyyy = myDate.getFullYear();
        dateStr+=((mm<10)?'0'+mm.toString():mm.toString()) + '/';

        dateStr+=((dd<10)?'0'+dd.toString():dd.toString()) + '/';
        dateStr+=yyyy.toString();

        return dateStr;
    }

    async getSkillsetReport(skillsetID:number,locationID:number,dateFrom:Date,dateTo:Date):Promise<SkillsetRpt>{
        // await this.getSetUser();
        await this.getDependencies();
        this.skillsetRpt=new SkillsetRpt('',[]);
        this.associates=[];
        //step 1 get skillsetName
        var skillset:Skillset=await this.getSkillset(skillsetID);
        var associatedepartmentskillset:AssociateDepartmentSkillset[]=[];
        //step 2 get associates from DepartmentSkillset and associatedepartmentskillset
        var departmentSkillsets:DepartmentSkillsets1[]=await this.getDepartmentSkillsets(skillsetID);
        for(var i = 0 ; i<departmentSkillsets.length;i++){
            //get associate from associatedepartmentskillset
            associatedepartmentskillset=associatedepartmentskillset.concat(await this.getAssociateDepartmentSkillset(departmentSkillsets[i].DepartmentSkillsetID));
        }
        //getting the associate
        await this.getAssociateInfo(associatedepartmentskillset,locationID,dateFrom,dateTo);

        this.skillsetRpt.Associates=await this.associates;
        this.skillsetRpt.Skillset=await skillset.SkillsetDescr;
        return new Promise<SkillsetRpt>((resolve) =>             
            resolve(this.skillsetRpt)
        );
    }

    async getAssociateInfo(assocDeptSkillsets:AssociateDepartmentSkillset[],locationID:number,dateFrom:Date,dateTo:Date){
        var associateDetails:AssociateDetails=new AssociateDetails('','','','','');
        //console.log(assocDeptSkillsets);

        while (assocDeptSkillsets.length>0){
            var assocDeptSkillset = assocDeptSkillsets.pop();
            var associate:Associate=await this.getAssociateDetails(assocDeptSkillset.AssociateID);
           
            var department:Department=await this.getDepartment(associate.DepartmentID);
            var location:Location=await this.getLocation(associate.LocationID);
            associateDetails.Department=await department.DepartmentDescr;
            associateDetails.Location=await location.LocationDescr;
            associateDetails.Name=await this.getFullName(associate.AssociateID);
            associateDetails.VPN=associate.VPN?'Yes':'No';
            associateDetails.UpdatedOn= this.getDateString(new Date(associate.UpdatedOn));
            associateDetails.assocId=await associate.AssociateID;
            
            (
                associate.LocationID==locationID  && 
                (
                    (
                        new Date(associate.UpdatedOn)>=dateFrom &&
                        new Date(associate.UpdatedOn)<=dateTo) ||
                        (dateFrom==null&&dateTo==null)
                )
                ) ? this.associates.push(associateDetails): null;

            associateDetails=new AssociateDetails('','','','','','',0);
            assocDeptSkillsets=assocDeptSkillsets.filter(x=>x.AssociateID!=assocDeptSkillset.AssociateID);
        }
    }

    async getDepartmentSkillsets(skillsetID:number):Promise<DepartmentSkillsets1[]>{
        var departmentSkillsets:DepartmentSkillsets1[]=await this.allDepartmentSkillsets;
        // var departmentSkillsets:DepartmentSkillsets1[]=await this.departmentSkillsetSvc.getDepartmentSkillsets();
        return new Promise<DepartmentSkillsets1[]>((resolve) =>             
            resolve(
                departmentSkillsets.filter(x=>x.SkillsetID==skillsetID)
            )
        );
    }

    async getAssociateDetails(assocID:number):Promise<Associate>{
        //01-24-18
        return new Promise<Associate>((resolve) =>
            resolve(
                this.allAssociates.find(x=>x.AssociateID==assocID)
                // this.associateSvc.getAssociate(assocID)
            )
        );
    }

    getFullName(assocID:number):string{
        // let user:Set_User= this.setUsers.find(x=>x.user_id==userid);
        var user=this.allAssociates.find(x=>x.AssociateID==assocID);
        return user.FullName
    }

    async getDepartment(departmentID:number):Promise<Department>{
        return new Promise<Department>((resolve)=>
            resolve(
                this.allDepartments.find(x=>x.DepartmentID==departmentID)
                // this.departmentSvc.getDepartment(departmentID)
            )
        );
    }
    async getLocation(locationID:number):Promise<Location>{
        return new Promise<Location>((resolve) => 
            resolve(
                this.allLocations.find(x=>x.LocationID==locationID)
                // this.locationSvc.getLocation(locationID)
            )
        );
    }

    async getSkillset(skillsetID:number):Promise<Skillset>{
        return new Promise<Skillset>((resolve) =>
            resolve(
                this.allSkillsets.find(x=>x.SkillsetID==skillsetID)
                // this.skillsetSvc.getSkillset(skillsetID)
            )
        );
    }

    async getAssociateDepartmentSkillset(departmentSkillsetID:number):Promise<AssociateDepartmentSkillset[]>{
        var associateDepartmentSkillset:AssociateDepartmentSkillset[]=await this.allAssociateDepartmentSkillset;
        // var associateDepartmentSkillset:AssociateDepartmentSkillset[]=await this.assocDeptSkillsetSvc.getAssociateDeptSkillsets();

        associateDepartmentSkillset=associateDepartmentSkillset.filter(x=>x.DepartmentSkillsetID==departmentSkillsetID);
        return new Promise<AssociateDepartmentSkillset[]>((resolve) =>
            resolve(associateDepartmentSkillset)
        );
    }

}


import { Injectable } from '@angular/core';

//services
import { SkillsetSvc } from '../../com_services/skillset.svc';
import { DepartmentSvc } from '../../com_services/department.svc';
import { AssociateSvc } from '../../com_services/associate.svc';
import { LocationSvc } from '../../com_services/location.svc';
// import { Set_UserSvc } from '../../com_services/set_user.svc';
import { CurrentUserSvc } from '../../com_services/currentuser.svc';
import { DepartmentSkillsetsSvc } from '../../com_services/dept_skillset.svc';
import { AssociateDepartmentSkillsetsSvc } from '../../com_services/assoc_dept_skillset.svc';
//entities
import { Location,Department,Skillset,
  Associate,User,
  AssociateDepartmentSkillset,DepartmentSkillsets1,
  AssociateRpt,DepartmentSkills,AssociateDetails
} from '../../com_entities/entities';

@Injectable()
export class DataAssociateReport {
    constructor(
        private associateSvc:AssociateSvc,
        private departmentSvc:DepartmentSvc,
        private locationSvc:LocationSvc,
        private skillsetSvc:SkillsetSvc,
        // private setUserSvc:Set_UserSvc,
        private currentUserSvc:CurrentUserSvc,
        private departmentSkillsetSvc:DepartmentSkillsetsSvc,
        private assocDeptSkillsetSvc:AssociateDepartmentSkillsetsSvc
    ){

    }
    associateReport:AssociateRpt=new AssociateRpt(new AssociateDetails('','','','','',''),[]);
    // setUsers:Set_User[]=[];
    users:User[]=[];

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

    async getAssociateReport(associateID:number,dateFrom:Date,dateTo:Date):Promise<AssociateRpt>{
        this.associateReport=await new AssociateRpt(new AssociateDetails('','','','','',''),[]);
        var associatesDepartmentSkillsets:AssociateDepartmentSkillset[]= await this.getAssociateDepartmentSkillsets(associateID);
        var departmentSkillsets:DepartmentSkillsets1[]=await [];
        var associate:Associate=await this.getAssociateDetails(associateID);
        var currentDepartment:Department;
        var currentLocation:Location;
        this.getSetUser();
        //loop ads to get departmentskillsets
        for(var i=0;i<associatesDepartmentSkillsets.length;i++){
            departmentSkillsets.push(
                await this.getDepartmentSkillsets(associatesDepartmentSkillsets[i].DepartmentSkillsetID)
            );
        }
        while(departmentSkillsets.length>0){
            var tempdsTobeRemoved:DepartmentSkillsets1=departmentSkillsets[0];
            var a=await this.mergeSkillstoDepartment(departmentSkillsets,tempdsTobeRemoved.DepartmentID)
            departmentSkillsets= await departmentSkillsets.filter(x=>x.DepartmentID!=tempdsTobeRemoved.DepartmentID);
            this.associateReport.DepartmentSkills.push(a);
        }
        //getting current department and location
        currentDepartment=await this.getDepartment(associate.DepartmentID);
        currentLocation=await this.getLocation(associate.LocationID);
        //fill details of the associateReport
        this.associateReport.Associate.Name=associate.FullName;
        this.associateReport.Associate.Department=await currentDepartment.DepartmentDescr;
        this.associateReport.Associate.Location=await currentLocation.LocationDescr;
        this.associateReport.Associate.Phone=await associate.PhoneNumber;
        this.associateReport.Associate.VPN=await associate.VPN?'Yes':'No';
        this.associateReport.Associate.UpdatedOn= await this.getDateString(new Date(associate.UpdatedOn));
        
        return new Promise<AssociateRpt>((resolve) =>       
            (new Date(associate.UpdatedOn)>=dateFrom&&new Date(associate.UpdatedOn)<=dateTo) || (dateFrom==null&&dateTo==null)?       
            resolve(this.associateReport) :
            resolve(null)
        );
    }

    async getAssociateReport2(associateID:number,departmentID:number,dateFrom:Date,dateTo:Date):Promise<AssociateRpt>{
        this.associateReport=new AssociateRpt(new AssociateDetails('','','','','',''),[]);
        var associatesDepartmentSkillsets:AssociateDepartmentSkillset[]= await this.getAssociateDepartmentSkillsets(associateID);
        var departmentSkillsets:DepartmentSkillsets1[]=[];
        var associate:Associate=await this.getAssociateDetails(associateID);
        var currentDepartment:Department;
        var currentLocation:Location;
        this.getSetUser();
        //loop ads to get departmentskillsets
        for(var i=0;i<associatesDepartmentSkillsets.length;i++){
            departmentSkillsets.push(
                await this.getDepartmentSkillsets(associatesDepartmentSkillsets[i].DepartmentSkillsetID)
            );
        }
        //filter departmentskillsets according to associates current department
        departmentSkillsets=departmentSkillsets.filter(x=>x.DepartmentID==departmentID);
        //getting the associates' skills per departments
        while(departmentSkillsets.length>0){
            var tempdsTobeRemoved:DepartmentSkillsets1=departmentSkillsets[0];
            var a=await this.mergeSkillstoDepartment(departmentSkillsets,tempdsTobeRemoved.DepartmentID)
            departmentSkillsets= await departmentSkillsets.filter(x=>x.DepartmentID!=tempdsTobeRemoved.DepartmentID);
            this.associateReport.DepartmentSkills.push(a);
        }
        //getting current department and location
        currentDepartment=await this.getDepartment(associate.DepartmentID);
        currentLocation=await this.getLocation(associate.LocationID);
        //fill details of the associateReport
        this.associateReport.Associate.Name=associate.FullName;
        this.associateReport.Associate.Department=await currentDepartment.DepartmentDescr;
        this.associateReport.Associate.Location=await currentLocation.LocationDescr;
        this.associateReport.Associate.Phone=await associate.PhoneNumber;
        this.associateReport.Associate.VPN=await associate.VPN?'Yes':'No';
        this.associateReport.Associate.UpdatedOn= this.getDateString(new Date(associate.UpdatedOn));
        return new Promise<AssociateRpt>((resolve) =>             
            (new Date(associate.UpdatedOn)>=dateFrom&&new Date(associate.UpdatedOn)<=dateTo)||(dateFrom==null&&dateTo==null) ?       
            resolve(this.associateReport) :
            resolve(null)
        );
    }

    async getAssociateDetails(assocID:number):Promise<Associate>{
        return new Promise<Associate>((resolve) =>
            resolve(this.associateSvc.getAssociate(assocID))
        );
    }

    async getSetUser(){
        // this.setUsers=await this.setUserSvc.getSet_Users();
        this.users=await this.currentUserSvc.GetUserInAppFromBtam();
    }

    //step 1: get ads[] to get the departmentskillsets[] of an associate
    async getAssociateDepartmentSkillsets(associateID:number):Promise<AssociateDepartmentSkillset[]>{
        var ads = await this.assocDeptSkillsetSvc.getAssociateDeptSkillsets();
        ads=ads.filter(x=>x.AssociateID==associateID);
        return new Promise<AssociateDepartmentSkillset[]>((resolve) => 
           resolve(ads)
        );
    }
    //step 2: get departmentskillsets where ads[i].departmentskillsetID==dsid
    async getDepartmentSkillsets(dsID:number):Promise<DepartmentSkillsets1>{
        return new Promise<DepartmentSkillsets1>((resolve) => 
            resolve(this.departmentSkillsetSvc.getDepartmentSkillset(dsID.toString()))
        );
    }
    //step 3: get departments 
    async getDepartment(departmentID:number):Promise<Department>{
        return new Promise<Department>((resolve)=>
            resolve(this.departmentSvc.getDepartment(departmentID))
        );
    }
    async getLocation(locationID:number):Promise<Location>{
        return new Promise<Location>((resolve) => 
            resolve(this.locationSvc.getLocation(locationID))
        );
    }
    //get the skillsets from departmentskillset where departmentskillset.skillsetID==skillsetID
    async getSkillset(skillsetID:number):Promise<Skillset>{
        return new Promise<Skillset>((resolve) =>
            resolve(this.skillsetSvc.getSkillset(skillsetID))
        );
    }
    //match departmentSkillsets to its departments
    async filterDepartmentSkillset(ds:DepartmentSkillsets1[],deptID:number):Promise<DepartmentSkillsets1[]>{
        return new Promise<DepartmentSkillsets1[]>((resolve) => 
            resolve(ds.filter(x=>x.DepartmentID==deptID))
        );
    }
    
    async mergeSkillstoDepartment(departmentskillset:DepartmentSkillsets1[],departmentID:number):Promise<DepartmentSkills>{
        //get the departments from tempDS
        var tempDS:DepartmentSkillsets1[]=departmentskillset.filter(x=>x.DepartmentID==departmentID);
        var tempDepartment:Department=await this.departmentSvc.getDepartment(departmentID);
        var departmentSKills:DepartmentSkills=new DepartmentSkills([],'');
        departmentSKills.DepartmentName=tempDepartment.DepartmentDescr;

        for (var i = 0;i<tempDS.length ;i++){
            departmentSKills.Skills.push(
                await this.getSkillset(tempDS[i].SkillsetID)
            );
        }

        return new Promise<DepartmentSkills>(resolve => 
            resolve(departmentSKills)
        );
    }

    getFullName(username:string):string{
        // let user:Set_User= this.setUsers.find(x=>x.user_name==username);
        var user:User= this.users.find(x=>x.UserName==username);
        // //console.log(user);
        return user==null ? null : user.FirstName + ' ' + user.LastName
    }
}

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
import { DataSkillsetReport } from './data-skillset.reports';
//entities
import { Location,Department,Skillset,
  Associate,
  AssociateDepartmentSkillset,DepartmentSkillsets1,
  User,
  //skillsetReport
  SkillsetRpt,
  LastTimeWorkedOnRpt
} from '../../com_entities/entities';

@Injectable()
export class DataLastworkedonReport {
    constructor(
        private associateSvc:AssociateSvc,
        private departmentSvc:DepartmentSvc,
        private locationSvc:LocationSvc,
        private skillsetSvc:SkillsetSvc,
        // private setUserSvc:Set_UserSvc,
        private currentUserSvc:CurrentUserSvc,        
        private departmentSkillsetSvc:DepartmentSkillsetsSvc,
        private assocDeptSkillsetSvc:AssociateDepartmentSkillsetsSvc,
        private skillsetRpt:DataSkillsetReport
    ){

    }
    associateDepartmentSkillsets:AssociateDepartmentSkillset[]=[];
    departmentSkillsets:DepartmentSkillsets1[]=[];
    skillsets:Skillset[]=[];
    Departments:Department[]=[];
    associates:Associate[]=[];
    // setUser:Set_User[]=[];
    users:User[]=[];
    locations:Location[]=[];
    lastTimeWorkedOnRpt:LastTimeWorkedOnRpt=new LastTimeWorkedOnRpt('',[]);


    async getLastWorkedOnReport(lastWorkedOn:string,locationID:number,dateFrom:Date,dateTo:Date):Promise<LastTimeWorkedOnRpt>{
        await this.getDependencies();
        var tempADS:AssociateDepartmentSkillset[] = await this.associateDepartmentSkillsets.filter(x=>x.LastWorkedOn==lastWorkedOn);
        this.lastTimeWorkedOnRpt=new LastTimeWorkedOnRpt('',[]);
        this.lastTimeWorkedOnRpt.lastWorkOnItem=lastWorkedOn;


        for(var i = 0 ; i <tempADS.length;i++){
            var ads=tempADS[i];
            this.lastTimeWorkedOnRpt.skillsetRpt=this.lastTimeWorkedOnRpt.skillsetRpt
                .concat(await this.getSkillsetRpt(ads.DepartmentSkillsetID,
                ads.AssociateID,locationID,dateFrom,dateTo
                ))
        }
        
        return new Promise<LastTimeWorkedOnRpt>((resolve)=>resolve(this.lastTimeWorkedOnRpt));
    }
    async getSkillsetRpt(dsID:number,associateID:number,locationID:number,dateFrom:Date,dateTo:Date):Promise<SkillsetRpt[]>{
        var tempDS:DepartmentSkillsets1 = await this.departmentSkillsets.find(x=>x.DepartmentSkillsetID==dsID);
        //this contains 
        var tempSkillsetReport:SkillsetRpt[]=[];

        // console.log(associateID);
        tempSkillsetReport=tempSkillsetReport.concat( 
            await this.skillsetRpt.getSkillsetReport(
                tempDS.SkillsetID,
                locationID,
                dateFrom,
                dateTo
                )
            ).filter(x=>(x.Associates=x.Associates.filter(y=>y.assocId==associateID)));
        // console.log(tempSkillsetReport);
        tempSkillsetReport
    

        return new Promise<SkillsetRpt[]>((resolve)=>resolve(tempSkillsetReport));

    }
    //

    async getDependencies(){
        this.associateDepartmentSkillsets= await this.assocDeptSkillsetSvc.getAssociateDeptSkillsets();
        this.locations=await this.locationSvc.getLocations();
        this.associates=await this.associateSvc.getAssociates();
        this.skillsets=await this.skillsetSvc.getSkillsets();
        this.Departments=await this.departmentSvc.getDepartments();
        this.departmentSkillsets=await this.departmentSkillsetSvc.getDepartmentSkillsets();
        // this.setUser=await this.setUserSvc.getSet_Users();
        this.users=await this.currentUserSvc.GetUserInAppFromBtam();
    }


}

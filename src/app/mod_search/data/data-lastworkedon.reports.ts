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
        private departmentSkillsetSvc:DepartmentSkillsetsSvc,
        private assocDeptSkillsetSvc:AssociateDepartmentSkillsetsSvc,
        private skillsetRpt:DataSkillsetReport
    ){

    }
    allAssociateDepartmentSkillsets:AssociateDepartmentSkillset[]=[];
    allDepartmentSkillsets:DepartmentSkillsets1[]=[];
    allSkillsets:Skillset[]=[];
    allDepartments:Department[]=[];
    allAssociates:Associate[]=[];
    // setUser:Set_User[]=[];
    allLocations:Location[]=[];
    lastTimeWorkedOnRpt:LastTimeWorkedOnRpt=new LastTimeWorkedOnRpt('',[]);


    async getLastWorkedOnReport(lastWorkedOn:string,locationID:number,dateFrom:Date,dateTo:Date):Promise<LastTimeWorkedOnRpt>{
        await this.getDependencies();
        var tempADS:AssociateDepartmentSkillset[] = await this.allAssociateDepartmentSkillsets.filter(x=>x.LastWorkedOn==lastWorkedOn);
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
        var tempDS:DepartmentSkillsets1 = await this.allDepartmentSkillsets.find(x=>x.DepartmentSkillsetID==dsID);
        //this contains 

        console.log(tempDS)
        var tempSkillsetReport:SkillsetRpt[]=[];

        // console.log(associateID);
        if(tempDS!=null){
            tempSkillsetReport=tempSkillsetReport.concat( 
                await this.skillsetRpt.getSkillsetReport(
                    tempDS.SkillsetID,
                    locationID,
                    dateFrom,
                    dateTo
                    )
                ).filter(x=>(x.Associates=x.Associates.filter(y=>y.assocId==associateID)));
        }
        
        return new Promise<SkillsetRpt[]>((resolve)=>resolve(tempSkillsetReport));
    }
    //

    async getDependencies(){
        this.allAssociateDepartmentSkillsets= await this.assocDeptSkillsetSvc.getAssociateDeptSkillsets();
        this.allLocations=await this.locationSvc.getLocations();
        this.allAssociates=await this.associateSvc.getAssociates();
        this.allSkillsets=await this.skillsetSvc.getSkillsets();
        this.allDepartments=await this.departmentSvc.getDepartments();
        this.allDepartmentSkillsets=await this.departmentSkillsetSvc.getDepartmentSkillsets();
    }


}

import { Injectable } from '@angular/core';
//services
import { DepartmentSkillsetsSvc } from '../../com_services/dept_skillset.svc';
import { DepartmentSvc } from '../../com_services/department.svc';
import { AssociateSvc } from '../../com_services/associate.svc';
import { SkillsetSvc } from '../../com_services/skillset.svc';
import { LocationSvc } from '../../com_services/location.svc';
import { AssociateDepartmentSkillsetsSvc } from '../../com_services/assoc_dept_skillset.svc';
//entities
import { Department,
  Associate,Skillset,
  Location,AssociateRpt,
  DepartmentSkillsets1,
  DepartmentRpt,AssociateDepartmentSkillset, AssociateDetails, DepartmentSkills
} from '../../com_entities/entities';
@Injectable()
export class DataDepartmentReport {
    constructor(
        private associateSvc:AssociateSvc,
        private departmentSvc:DepartmentSvc,
        private locationSvc:LocationSvc,
        private skillsetSvc:SkillsetSvc,
        private departmentSkillsetSvc:DepartmentSkillsetsSvc,
        private assocDeptSkillsetSvc:AssociateDepartmentSkillsetsSvc
    ){

    }

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

    async getAssociateDetails(assocID:number):Promise<Associate>{
        //01-24-18
        return new Promise<Associate>((resolve) =>
            resolve(
                this.allAssociates.find(x=>x.AssociateID==assocID)
                // this.associateSvc.getAssociate(assocID)
            )
        );
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

    async getDepartmentReport(departmentID:number,locationID:number,dateFrom:Date,dateTo:Date):Promise<DepartmentRpt>{
        await this.getDependencies();

        var department:Department=await this.getDepartment(departmentID);
        var departmentRpt:DepartmentRpt=new DepartmentRpt('',null,[]);
        var associates:Associate[]=[];

        departmentRpt.Department=await department.DepartmentDescr;
        departmentRpt.DepartmentID=await department.DepartmentID;

        //get associates from associatedepartmentSkillset according to departmentskillsets
        associates =this.allAssociates.filter(x=>x.DepartmentID==departmentID && (locationID>0?x.LocationID==locationID:x.LocationID!=0));
        associates.forEach(async element => {
            var assrpt = await this.getSkillsets(element)
            if(assrpt!=null){
                departmentRpt.AssociateRpts.push(assrpt)
            }
        });
        //get their skills according to their current department
        // for(var assoc of associates){
        //     var assocrpt=await this.assocRptSvc.getAssociateReport2(assoc.AssociateID,departmentID,dateFrom,dateTo);
        //     // console.log(assocrpt);
        //     if(assocrpt!=null)
        //         departmentRpt.AssociateRpts=departmentRpt.AssociateRpts.concat(assocrpt);
        //         // console.log(departmentRpt);
        // }

        return new Promise<DepartmentRpt>((resolve) =>             
            resolve(departmentRpt)
        );


    }

    async getSkillsets(associate:Associate):Promise<AssociateRpt>{
        var associateDepartmentSkillsets = this.allAssociateDepartmentSkillset.filter(x=>x.AssociateID==associate.AssociateID);
        var departmentSkillsetsDirty:DepartmentSkillsets1[]=[];
        var departmentSkillsetsClean:DepartmentSkillsets1[]=[];
        var associateRpt:AssociateRpt={};
        //associate detail
        associateRpt.Associate=new AssociateDetails(
            associate.FullName,
            associate.VPN?"Yes":"No",
            associate.PhoneNumber,
            (await this.getDepartment(associate.DepartmentID)).DepartmentDescr,            
            (await this.getLocation (associate.LocationID)).LocationDescr,
            this.getDateString(new Date(associate.UpdatedOn)),
            associate.AssociateID            
        );

        associateRpt.DepartmentSkills=[];

        associateDepartmentSkillsets.forEach(ads => {
            var ds = this.allDepartmentSkillsets.find(x=>x.DepartmentSkillsetID==ads.DepartmentSkillsetID && x.DepartmentID==associate.DepartmentID);
            if(ds!=null){
                departmentSkillsetsDirty.push(ds)
            }
        });

        departmentSkillsetsDirty.forEach(element => {
            var dept = this.allDepartmentSkillsets.find(x=>x.DepartmentID==element.DepartmentID && x.DepartmentSkillsetID==element.DepartmentSkillsetID);
            var skills = this.allSkillsets.find(x=>x.SkillsetID==element.SkillsetID);
            if(dept!=null&&skills!=null){
                departmentSkillsetsClean.push(dept)
                dept=null;
            }
        });


        while(departmentSkillsetsClean.length>0){

            var tempdset = departmentSkillsetsClean[0];
            var tempDsets = departmentSkillsetsClean.filter(x=>x.DepartmentID==tempdset.DepartmentID);
            var dept = this.allDepartments.find(x=>x.DepartmentID==tempdset.DepartmentID);
            var departmentSkills:DepartmentSkills= {DepartmentName:dept.DepartmentDescr,Skills:[]};
            tempDsets.forEach(ds => {
                var skillset= this.allSkillsets.find(x=>x.SkillsetID==ds.SkillsetID);
                departmentSkills.Skills.push(
                    skillset
                )
                skillset=null;
            });
            departmentSkillsetsClean=departmentSkillsetsClean.filter(x=>x.DepartmentID!=tempdset.DepartmentID);
            associateRpt.DepartmentSkills.push(departmentSkills);
        }


        return new Promise<AssociateRpt>((resolve) =>             
            resolve(associateRpt) 
        );
    }

    //getDepartmentSkillsets according to departmentID
    async getDepartmentSkillsets(departmentID:number):Promise<DepartmentSkillsets1[]>{
        var departmentSkillsets:DepartmentSkillsets1[]=await this.allDepartmentSkillsets
        // var departmentSkillsets:DepartmentSkillsets1[]=await this.departmentSkillsetSvc.getDepartmentSkillsets();
        return new Promise<DepartmentSkillsets1[]>((resolve) =>             
            resolve(
                departmentSkillsets.filter(x=>x.DepartmentID==departmentID)
            )
        );
    }

}

import { Injectable } from '@angular/core';
//services
import { DepartmentSkillsetsSvc } from '../../com_services/dept_skillset.svc';
import { DataAssociateReport } from './data-associate.reports';
import { DepartmentSvc } from '../../com_services/department.svc';
import { AssociateSvc } from '../../com_services/associate.svc';
//entities
import { Department,
  Associate,
  DepartmentSkillsets1,
  DepartmentRpt
} from '../../com_entities/entities';
@Injectable()
export class DataDepartmentReport {
    constructor(
        private departmentSkillsetSvc:DepartmentSkillsetsSvc,
        private assocRptSvc:DataAssociateReport,
         private associateSvc:AssociateSvc,
        private departmentSvc:DepartmentSvc,
        
    ){

    }

    allDepartmentSkillsets:DepartmentSkillsets1[]=[];
    allAssociates:Associate[]=[];
    allDepartments:Department[]=[];

    
    async getDependencies(){
        this.allDepartments=await this.departmentSvc.getDepartments();
        this.allAssociates=await this.associateSvc.getAssociates();
        this.allDepartmentSkillsets=await this.departmentSkillsetSvc.getDepartmentSkillsets();
    }

    async getDepartment(departmentID:number):Promise<Department>{
        return new Promise<Department>((resolve)=>
            resolve(
                this.allDepartments.find(x=>x.DepartmentID==departmentID)
                // this.departmentSvc.getDepartment(departmentID)
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

    async getDepartmentReport(departmentID:number,locationID:number,dateFrom:Date,dateTo:Date):Promise<DepartmentRpt>{
        await this.getDependencies();

        var department:Department=await this.getDepartment(departmentID);
        var departmentRpt:DepartmentRpt=new DepartmentRpt('',null,[]);
        var associates:Associate[]=[];

        departmentRpt.Department=await department.DepartmentDescr;
        departmentRpt.DepartmentID=await department.DepartmentID;

        //get associates from associatedepartmentSkillset according to departmentskillsets
      
        associates =this.allAssociates.filter(x=>x.DepartmentID==departmentID && x.LocationID==locationID);

        //get their skills according to their current department
        for(var assoc of associates){
            var assocrpt=await this.assocRptSvc.getAssociateReport(assoc.AssociateID,dateFrom,dateTo);
            // console.log(assocrpt);
            if(assocrpt!=null)
                departmentRpt.AssociateRpts=departmentRpt.AssociateRpts.concat(assocrpt);
                // console.log(departmentRpt);
        }

        return new Promise<DepartmentRpt>((resolve) =>             
            resolve(departmentRpt)
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

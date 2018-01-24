import { Component } from '@angular/core';
import { SkillsetSvc } from '../../com_services/skillset.svc';
import { DepartmentSkillsetsSvc } from '../../com_services/dept_skillset.svc';
import { AssociateDepartmentSkillsetsSvc } from '../../com_services/assoc_dept_skillset.svc';
import { Skillset,DepartmentSkillsets,
  AssociateDepartmentSkillset } from '../../com_entities/entities';
@Component({
  moduleId: module.id,
  selector: 'vw-skillset',
  templateUrl: 'vw_skillset.component.html',
})
export class VWSkillsetComponent {
  constructor(private skillsetSvc:SkillsetSvc,
    private departmentSkillsetSvc:DepartmentSkillsetsSvc,
    private assocDeptSkillsetSvc:AssociateDepartmentSkillsetsSvc){
    this.goBack();
  }
  p: number = 1;
  viewMode : number = 0;
  skillset : Skillset = new Skillset(0,'',true);
  skillsets: Skillset[] = [];
  departmentSkillsets:DepartmentSkillsets[]=[];
  associateDepartmentSkillset:AssociateDepartmentSkillset[]=[];
  mode:number=0;
  newDetails(){
    
    document.getElementById("txt").focus();
    this.skillset=new Skillset(0,'',true);
  }

  editDetails(skillset: Skillset){
    this.viewMode=1;
    //get detail
    this.mode=1;
    this.getDetails(skillset);
    document.getElementById("txt").focus();
  }

  getDetails(skillset : Skillset){
    this.skillset = skillset;
  }

  getStatus(status:boolean):string{
    return status ? "Yes" : "No";
  }

  changeStatus(skillset:Skillset){
    this.getDetails(skillset);
    this.viewMode=1;
    this.skillset.IsActive=false;
    this.deleteDepartmentSkillset(skillset.SkillsetID);
    this.saveSkillset();
  }

  //delete departmentSkillset
  async deleteDepartmentSkillset(skillsetID:number){
    this.departmentSkillsets=this.departmentSkillsets.filter(x=>x.SkillsetID==skillsetID);
    // console.log(this.departmentSkillsets);
    for(var i = 0 ; i<this.departmentSkillsets.length ;i++)
    {
      var deptSkillset=this.departmentSkillsets[i];
      await this.departmentSkillsetSvc.DeleteDepartmentSkillset(deptSkillset.DepartmentSkillsetID);
      this.deleteAssociateDepartmentSkillset(deptSkillset.DepartmentSkillsetID);
    }
    // console.log('done');
  }
  //delete assocdeptSkillset
  async deleteAssociateDepartmentSkillset(deptSkillsetID:number){
    let tempAssocDeptSkillset=this.associateDepartmentSkillset.filter(x=>x.DepartmentSkillsetID==deptSkillsetID);
    for(var i = 0 ; i<tempAssocDeptSkillset.length ;i++)
    {
      var assocDeptSkillset=tempAssocDeptSkillset[i];
      await this.assocDeptSkillsetSvc.DeleteAssociateDeptSkillset(assocDeptSkillset.AssociateDepartmentSkillsetID);
    }
    // console.log('done deleting associateDepartmentSkillset');
  }

  goBack(){
    this.getskillsets();
    this.getDepartmentSkillsets();
    this.getAssociateDepartmentSkillsets();
    this.mode=0;
    this.viewMode=0;
    this.skillset=new Skillset(0,'',true);
  }

  async saveSkillset(){
    if(this.entryValidation()){
      this.viewMode==0 ?
        ( 
          await this.skillsetSvc.postSkillset(this.skillset),
          alert("New Record has been successfully added.") 
        ) :
        ( 
          await this.skillsetSvc.putSkillset(this.skillset),
          alert("Record has been successfully updated.")
        );
      document.getElementById("btnGoBack").click();
      this.goBack();
    }
  }

  entryValidation():boolean{
    var msg='';
    this.skillset.SkillsetDescr.trim()=='' ? msg+='Skill Description is Required.\n' : null ;
    return msg==''?(true):(alert(msg),false);
  }

  async getskillsets(){
    this.skillsets=await this.skillsetSvc.getSkillsets();
  }
  async getDepartmentSkillsets(){
    this.departmentSkillsets = await this.departmentSkillsetSvc.getDepartmentSkillsets();
  }
  async getAssociateDepartmentSkillsets(){
    this.associateDepartmentSkillset = await this.assocDeptSkillsetSvc.getAssociateDeptSkillsets();
  }
}

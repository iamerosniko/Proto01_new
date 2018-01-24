import { Component,OnInit } from '@angular/core';
import { DepartmentSvc } from '../../com_services/department.svc';
import { SkillsetSvc } from '../../com_services/skillset.svc';
import { DepartmentSkillsetsSvc } from '../../com_services/dept_skillset.svc';
import { AssociateDepartmentSkillsetsSvc } from '../../com_services/assoc_dept_skillset.svc';
import { Department,Skillset,
  DepartmentSkillsets,SelectedSkillset,
  DepartmentSkillsets1,AssociateDepartmentSkillset } from '../../com_entities/entities';
@Component({
  moduleId: module.id,
  selector: 'vw-dept',
  templateUrl: 'vw_department_skills.component.html',
})
export class VWDepartmentSkillsComponent implements OnInit {
  constructor(
    private deptSvc:DepartmentSvc,
    private skillsetSvc:SkillsetSvc,
    private departmentSkillsetSvc:DepartmentSkillsetsSvc,
    private assocDeptSkillsetSvc:AssociateDepartmentSkillsetsSvc
  ){
    this.getDepartments();
  }
  ngOnInit(){
    this.getDepartments();
  }
  p: number = 1;
  //department combobox
  checkallValue:boolean;
  tempDeptSkill:DepartmentSkillsets
  selectedDepartmentID:number=-1;
  associateDepartmentSkillset:AssociateDepartmentSkillset[]=[];
  departments: Department[] = [];
  skillsets: Skillset[]=[];
  selectedSkillsets:SelectedSkillset[]=[];
  //gets the previous state
  departmentSkillsets:DepartmentSkillsets1[]=[];
  //for deletion
  delDepartmentSkillsets:DepartmentSkillsets1[]=[];
  //for new entry
  newDepartmentSkillsets:DepartmentSkillsets1[]=[];
   //gets the actual state
  tempDepartmentSkillsets:DepartmentSkillsets1[]=[];
  //step1
  async getDepartments(){
    this.departments=await this.deptSvc.getDepartments();
    this.departments= this.departments.filter(x=>x.IsActive==true);
    this.getAssociateDepartmentSkillsets();    
  }
  async getAssociateDepartmentSkillsets(){
    this.associateDepartmentSkillset = await this.assocDeptSkillsetSvc.getAssociateDeptSkillsets();
  }
  //step2
  async getSkillSets(deptID:number){
    this.tempDepartmentSkillsets=[];
    this.newDepartmentSkillsets=[];
    this.departmentSkillsets=[];
    this.delDepartmentSkillsets=[];
    // console.log('getSkillsets')
    //reset checkall
    this.checkallValue=false;
    //1. get skillsets
    this.skillsets=await this.skillsetSvc.getSkillsets();
    //remove all inactive skillsets
    this.skillsets=await this.skillsets.filter(x=>x.IsActive==true);
    //clears the checkboxes
    this.selectedSkillsets=[];
    //2. loop skillsets to custom array
    for (var i = 0 ; i<this.skillsets.length; i++){
      //console.log(deptID+" - "+this.skillsets[i].SkillsetID)
      this.selectedSkillsets.push(
        new SelectedSkillset( 
          new DepartmentSkillsets1(0,deptID,this.skillsets[i].SkillsetID)
          ,false
          ,this.skillsets[i].SkillsetDescr
        )
      );
    }
    this.getDepartmentSkillsets(deptID).then(()=>{
      this.compareSelectedSkillsets();
    });
    
  }
  //step3
  async getDepartmentSkillsets(deptID:number){
    this.departmentSkillsets = await this.departmentSkillsetSvc.getDepartmentSkillsets();
    this.departmentSkillsets = this.departmentSkillsets.filter(ds=>ds.DepartmentID==deptID);
    //console.log(this.departmentSkillsets);
  }
  //step 4
  async compareSelectedSkillsets(){

    for (var i = 0; i < this.selectedSkillsets.length; i++){
      var selectedSkillset=this.selectedSkillsets[i];
        this.tempDeptSkill= await this.departmentSkillsets.find(ds=>
        ds.SkillsetID==selectedSkillset.departmentSkillset.SkillsetID);
      if (this.tempDeptSkill!=null){
        selectedSkillset.IsSelected=true;
      } 
    }
  }

  checkAllSkills(isChecked:boolean){
    for (var i = 0; i < this.selectedSkillsets.length; i++){
      var selectedSkillset=this.selectedSkillsets[i];
      selectedSkillset.IsSelected=isChecked;
    }
  }
  
  async saveDepartmentSkillset(){

    // this.getSkillSets(this.selectedDepartmentID)
    this.tempDepartmentSkillsets=await this.getDepartmentSkillsetsInSelectedSkillset();
    this.newDepartmentSkillsets= await this.getNewDepartmentSkillsets();
    this.delDepartmentSkillsets=await this.getDelDepartmentSkillsets();
    await this.addNewDepartmentSkillset();
    await this.deleteDepartmentSkillset();
    await alert("Record has been successfully updated.");
    await this.getSkillSets(this.selectedDepartmentID);
  }

  async getDepartmentSkillsetsInSelectedSkillset():Promise<DepartmentSkillsets1[]>{
    // console.log('executing step 1 : getDepartmentSkillsetsInSelectedSkillset');
    var tmpDeptSkills:DepartmentSkillsets1[]=[];
    for (var i = 0; i < this.selectedSkillsets.length; i++){
      var selectedSkillset=this.selectedSkillsets[i]; 
      selectedSkillset.IsSelected==true ? tmpDeptSkills.push(selectedSkillset.departmentSkillset) : null;
    }
    return new Promise<DepartmentSkillsets1[]>(
      (resolve)=>resolve(tmpDeptSkills)
    );
  }

  async getNewDepartmentSkillsets(){
    // console.log('executing step 2.1 : getNewDepartmentSkillset');
    var newDeptSkills:DepartmentSkillsets1[]=[];
    var oldDeptSkills:DepartmentSkillsets1[]=this.departmentSkillsets;
    for (var i = 0; i < this.tempDepartmentSkillsets.length; i++){
      var departmentSkillset=this.tempDepartmentSkillsets[i];
      if(oldDeptSkills.filter(x=>x.SkillsetID==departmentSkillset.SkillsetID 
        && x.DepartmentID==departmentSkillset.DepartmentID).length==0 )
      {
        //this is to be added
        newDeptSkills.push(departmentSkillset);
      }
    }
    
    return new Promise<DepartmentSkillsets1[]>(
      (resolve)=>resolve(newDeptSkills)
    );
  }

  async getDelDepartmentSkillsets(){
    // console.log('executing step 2.2 : getDelDepartmentSkillsets');
    var delDeptSkills:DepartmentSkillsets1[]=[];
    var oldDeptSkills:DepartmentSkillsets1[]=this.departmentSkillsets;
    for (var i = 0; i < oldDeptSkills.length; i++){
      var departmentSkillset=oldDeptSkills[i];
      if(this.tempDepartmentSkillsets.filter(x=>x.SkillsetID==departmentSkillset.SkillsetID 
        && x.DepartmentID==departmentSkillset.DepartmentID).length==0 )
      {
        //this is to be added
        delDeptSkills.push(departmentSkillset);
      }
    }
    
    return new Promise<DepartmentSkillsets1[]>(
      (resolve)=>resolve(delDeptSkills)
    );
  }
  
  async addNewDepartmentSkillset(){
    // console.log('executing step 3 : addNewDepartmentSkillset');
    // console.log(this.newDepartmentSkillsets);
    //this will add the new departmentSkillset
    for (var i = 0; i < this.newDepartmentSkillsets.length; i++){
      var selectedSkillset=this.newDepartmentSkillsets[i];
      await this.departmentSkillsetSvc.postDepartmentSkillset(selectedSkillset);
    }
  }
  
  async deleteDepartmentSkillset(){
    // console.log('executing step 4 : deleteDepartmentSkillset');
    // console.log(this.delDepartmentSkillsets);
    //this will delete the departmentSkillset
    for (var i = 0; i < this.delDepartmentSkillsets.length; i++){
      var departmentSkillset=this.delDepartmentSkillsets[i];
      //delete to associateDepartmentSkillset
      await this.deleteAssociateDepartmentSkillset(
        this.associateDepartmentSkillset.filter(
          x=>x.DepartmentSkillsetID==departmentSkillset.DepartmentSkillsetID
        )
      );
      this.departmentSkillsetSvc.DeleteDepartmentSkillset(departmentSkillset.DepartmentSkillsetID).then(
        ()=>{
          // console.log('deleted: '+departmentSkillset.DepartmentSkillsetID.toString())
        }).catch(
        ()=>{
          // console.log('failed')
        });
    }
  }

  async deleteAssociateDepartmentSkillset(ads:AssociateDepartmentSkillset[]){
    // console.log(ads);
    for (var i = 0 ;i < ads.length; i++){
      await this.assocDeptSkillsetSvc.DeleteAssociateDeptSkillset(ads[i].AssociateDepartmentSkillsetID);
    }
  }

  
}

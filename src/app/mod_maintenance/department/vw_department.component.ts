import { Component } from '@angular/core';
import { DepartmentSvc } from '../../com_services/department.svc';
import { DepartmentSkillsetsSvc } from '../../com_services/dept_skillset.svc';
import { AssociateDepartmentSkillsetsSvc } from '../../com_services/assoc_dept_skillset.svc';
import { Department,DepartmentSkillsets,
  AssociateDepartmentSkillset } from '../../com_entities/entities';
@Component({
  moduleId: module.id,
  selector: 'vw-dept',
  templateUrl: 'vw_department.component.html',
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
export class VWDepartmentComponent {
  constructor(private deptSvc:DepartmentSvc,
    private departmentSkillsetSvc:DepartmentSkillsetsSvc,
    private assocDeptSkillsetSvc:AssociateDepartmentSkillsetsSvc){
    this.goBack();
  }
  loading:boolean=false;
  
  p: number = 1;
  department : Department = new Department(0,'',true);
  departments: Department[] = [];
  departmentSkillsets:DepartmentSkillsets[]=[];
  associateDepartmentSkillset:AssociateDepartmentSkillset[]=[];
  mode:number=0;
  message:string="";
  newDetails(){
    this.department=new Department(0,'',true);
  }

  editDetails(dept: Department){
    //get detail
    this.mode=1;
    this.getDetails(dept);
  }

  getDetails(dept : Department){
    this.department = dept;
  }

  getStatus(status:boolean):string{
    return status ? "Yes" : "No";
  }

  changeStatus(dept:Department){
    if(confirm("Do you want to delete "+dept.DepartmentDescr+"?")){
      this.mode=1;
      this.getDetails(dept);
      this.department.IsActive=false;
      this.deleteDepartmentSkillset(dept.DepartmentID);
      this.saveDepartment();
    }
  }
  //delete departmentSkillset
  async deleteDepartmentSkillset(deptID:number){
    this.departmentSkillsets=this.departmentSkillsets.filter(x=>x.DepartmentID==deptID);
    for(var i = 0 ; i<this.departmentSkillsets.length ;i++)
    {
      var deptSkillset=this.departmentSkillsets[i];
      await this.departmentSkillsetSvc.DeleteDepartmentSkillset(deptSkillset.DepartmentSkillsetID);
      this.deleteAssociateDepartmentSkillset(deptSkillset.DepartmentSkillsetID);
    }
    // console.log('done deleting departmentSkillset');
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

  async goBack(){
    this.mode=0;
    this.getDepartments();
    this.getDepartmentSkillsets();
    this.getAssociateDepartmentSkillsets();
    this.department=new Department(0,'',true);   
  }

  async saveDepartment(){
    if(this.entryValidation()){
      this.mode==0 ?
      ( 
        await this.deptSvc.postDepartment(this.department),
        this.message="New Record has been successfully added.",
        document.getElementById('departmentModalbtn').click()
      ) :
      ( 
        await this.deptSvc.putDepartment(this.department),
        this.message="Record has been successfully updated.",
        document.getElementById('departmentModalbtn').click()
      );  
    }
  }

  btnClose(){
    document.getElementById("btnGoBack").click();
    this.goBack();
  }

  entryValidation():boolean{
    var msg='';
    this.department.DepartmentDescr.trim()=='' ? msg+='Department Description is Required.\n' : null ;
    return msg==''?(true):(alert(msg),false);
  }

  async getDepartments(){
    this.loading=await true;
    this.departments=(await this.deptSvc.getDepartments()).filter(x=>x.IsActive==true);
    this.loading=await false;
  }

  async getDepartmentSkillsets(){
    this.departmentSkillsets = await this.departmentSkillsetSvc.getDepartmentSkillsets();
  }

  async getAssociateDepartmentSkillsets(){
    this.associateDepartmentSkillset = await this.assocDeptSkillsetSvc.getAssociateDeptSkillsets();
  }
}

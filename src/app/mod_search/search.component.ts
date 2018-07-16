import { Component,OnInit,ViewChild,ElementRef  } from '@angular/core';
import { Router }  from '@angular/router';
//services
import { SkillsetSvc } from '../com_services/skillset.svc';
import { DepartmentSvc } from '../com_services/department.svc';
import { AssociateSvc } from '../com_services/associate.svc';
import { LocationSvc } from '../com_services/location.svc';
import { DataAssociateReport } from './data/data-associate.reports';
import { DataSkillsetReport } from './data/data-skillset.reports';
import { DataDepartmentReport } from './data/data-department.reports';
import { DataLastworkedonReport } from './data/data-lastworkedon.reports';
import { ExcelService } from '../com_services/excel.service';

import 'hammerjs';
//entities
import { Location,Department,Skillset,
  Associate,
  AssociateRpt,SelectItem,
  SkillsetRpt,DepartmentRpt,LastTimeWorkedOnRpt
  //export,
  ,ExportAssociateRpt,ExportSkillsRpt,ExportDeptsRpt, ExportLastTimeWorkedOnRpt
} from '../com_entities/entities';
@Component({
  selector: 'search',
  templateUrl: 'search.component.html',
})


export class SearchComponent implements OnInit {
  constructor(
    private associateSvc:AssociateSvc,
    private departmentSvc:DepartmentSvc,
    private locationSvc:LocationSvc,
    private skillsetSvc:SkillsetSvc,
    private associateReportSvc:DataAssociateReport,
    private skillsetReportSvc:DataSkillsetReport,
    private departmentReportSvc:DataDepartmentReport,
    private lastWorkedOnReportSvc:DataLastworkedonReport,
    private excelService: ExcelService,
    private router:Router
  ){

  }
  p: number = 1;
  
  @ViewChild('assocRpt') el:ElementRef;
  radioSelect:number=-1;
  selectedLocation:number=-1;
  public yourVariableName: any=[];
  //initial collection
  skillsets: Skillset[] = [];
  locations:Location[]=[];
  departments:Department[]=[];
  associates:Associate[]=[];
  // set_Users:Set_User[]=[];
  associateRpt:AssociateRpt[]=[];
  skillsetRpt:SkillsetRpt[]=[];
  departmentRpt:DepartmentRpt[]=[];
  lastTimeWorkedOnRpt:LastTimeWorkedOnRpt[]=[];
  //ng2 select variables
  public items:any[]=[];
  public selectedItems:SelectItem[] = [];
  //material dates
  dateFrom:Date=null;
  dateTo:Date=null;

  isPrintReady:boolean=false;
  isRunReportReady:boolean=true;
  isLoading:boolean=false;
  isLoadingResources:boolean=true;
  progress:number=0;
  progressFor:string='';
  

  async print(){
   

    //assoc
    if(this.radioSelect==0)
    {
      // var associateExports:ExportAssociateRpt[]=[];
      var associateExports:any[]=[];
      this.associateRpt.forEach(async assoc => {
        if(assoc.DepartmentSkills.length==0){
          var associateExport :any = {
            "Current Department" : assoc.Associate.Department,
            "Current Location" :assoc.Associate.Location,
            "Full Name" : assoc.Associate.Name,
            "Phone Number" : assoc.Associate.Phone,
            "Updated On" : assoc.Associate.UpdatedOn,
            VPN: assoc.Associate.VPN
          }
          associateExports.push(associateExport); 
        }
        assoc.DepartmentSkills.forEach(async deptSkill => {
          deptSkill.Skills.forEach(async skills=> {
            var associateExport :any = {
              "Current Department" : assoc.Associate.Department,
              "Current Location" :assoc.Associate.Location,
              "Full Name" : assoc.Associate.Name,
              "Phone Number" : assoc.Associate.Phone,
              "Updated On" : assoc.Associate.UpdatedOn,
              VPN: assoc.Associate.VPN,
              "Department-Skill":deptSkill.DepartmentName,
              "Skills" : skills.SkillsetDescr 
            }
            associateExports.push(associateExport); 
          });
        });
      });
      console.log(associateExports)
      await this.excelService.exportAsExcelFile(associateExports, "Associates");
    }
    //skillset 
    else if(this.radioSelect==1){
      var skillsExports:ExportSkillsRpt[]=[];
      this.skillsetRpt.forEach(async skills => {
        skills.Associates.forEach(async assoc => {
          var skillsExport :ExportSkillsRpt = {}
          skillsExport.CurrentDepartment=assoc.Department;
          skillsExport.CurrentLocation=assoc.Location;
          skillsExport.Name=assoc.Name;
          skillsExport.Phone=assoc.Phone;
          skillsExport.UpdatedOn=assoc.UpdatedOn;
          skillsExport.VPN=assoc.VPN;
          skillsExport.Skill=skills.Skillset;
          skillsExports.push(skillsExport); 
        });
      });
      await this.excelService.exportAsExcelFile(skillsExports, "Skillset");
    }
    //departments
    else if(this.radioSelect==2){
      var deptExports : ExportDeptsRpt[]=[];
      this.departmentRpt.forEach(async depts =>{
        depts.AssociateRpts.forEach(async assoc => {
          if(assoc.DepartmentSkills.length==0){
            var deptExport :ExportDeptsRpt = {}
            deptExport.CurrentDepartment=assoc.Associate.Department;
            deptExport.CurrentLocation=assoc.Associate.Location;
            deptExport.Name=assoc.Associate.Name;
            deptExport.Phone=assoc.Associate.Phone;
            deptExport.UpdatedOn=assoc.Associate.UpdatedOn;
            deptExport.VPN=assoc.Associate.VPN;
            deptExports.push(deptExport); 
          }
          assoc.DepartmentSkills.forEach(async deptSkill => {
            deptSkill.Skills.forEach(async skills=> {
              var deptExport :ExportDeptsRpt = {}

              deptExport.CurrentDepartment=assoc.Associate.Department;
              deptExport.CurrentLocation=assoc.Associate.Location;
              deptExport.Name=assoc.Associate.Name;
              deptExport.Phone=assoc.Associate.Phone;
              deptExport.UpdatedOn=assoc.Associate.UpdatedOn;
              deptExport.VPN=assoc.Associate.VPN;
              deptExport.Skill=skills.SkillsetDescr;
              deptExports.push(deptExport); 

            });
          });
        });
      });
      await this.excelService.exportAsExcelFile(deptExports, "Departments");
    }
    else if(this.radioSelect==3){
      var lstExports : ExportLastTimeWorkedOnRpt[]=[];
      this.lastTimeWorkedOnRpt.forEach(async lst=>{
        lst.skillsetRpt.forEach( async skills=> {
          skills.Associates.forEach(async assoc => {
            var lstExport :ExportLastTimeWorkedOnRpt = {}
            lstExport.LastTimeWorkedOn=lst.lastWorkOnItem;
            lstExport.CurrentDepartment=assoc.Department;
            lstExport.CurrentLocation=assoc.Location;
            lstExport.Name=assoc.Name;
            lstExport.Phone=assoc.Phone;
            lstExport.UpdatedOn=assoc.UpdatedOn;
            lstExport.VPN=assoc.VPN;
            lstExport.Skill=skills.Skillset;
            lstExports.push(lstExport); 
          });
        });
      });
      await this.excelService.exportAsExcelFile(lstExports, "Last Time Worked On");
    }
  }
 
  async ngOnInit(){
    if(sessionStorage.getItem('AuthToken')!=null){
      await this.getDependencies();
      if(this.associates!=null){
        await this.getItems();
      }
      else{
        this.router.navigate(['/noaccess'])
      }
      this.isLoadingResources=false;
    }
    else{
      window.location.assign("/")
    }
    
  }

  async getDependencies(){
    this.associates = await this.associateSvc.getAssociates();
    this.locations = await this.locationSvc.getLocations();
    this.departments = await this.departmentSvc.getDepartments();
    this.skillsets=await this.skillsetSvc.getSkillsets();
  }
  
  async getItems(){
    this.items=[];
    this.yourVariableName=[];
    this.associateRpt=[];
    this.skillsetRpt=[];
    this.selectedItems=[];
    if(this.radioSelect==0){
      console.log(this.selectedLocation);
      var associates=this.associates;
      // let associates=this.associates.filter(x=>this.selectedLocation>0?x.LocationID==this.selectedLocation : x);
      associates.forEach(element => {
        this.items.push( { 'id': element.AssociateID.toString(), 'text':element.FullName});
      });
      // let associates=this.selectedLocation>0?this.associates.filter(x=>x.LocationID==this.selectedLocation):this.associates;
    }
    else if (this.radioSelect==1){
      for(var i = 0; i<this.skillsets.length;i++){
        this.items.push( { 'id': this.skillsets[i].SkillsetID.toString(), 'text': this.skillsets[i].SkillsetDescr});
      }
    }
    else if (this.radioSelect==2){
      for(var i = 0; i<this.departments.length;i++){
        this.items.push( { 'id': this.departments[i].DepartmentID.toString(), 'text': this.departments[i].DepartmentDescr});
      }
    }
    else if (this.radioSelect==3){
      this.items.push({ 'id': 1, 'text': '< 30 Days Ago'});
      this.items.push({ 'id': 2, 'text': '1-6 Months'});
      this.items.push({ 'id': 3, 'text': '6-12 Months'});
      this.items.push({ 'id': 4, 'text': 'Over 1 Year ago'});
    }
  }

  async getResult(){
    this.associateRpt=await [];
    this.skillsetRpt=await [];
    this.departmentRpt=await [];
    this.lastTimeWorkedOnRpt=await [];
    this.progress=0;
    this.progressFor='';
    if(this.compareRequiredFields()&&this.compareDate()) 
    {
      this.isPrintReady=false;
      this.isRunReportReady=false;
      if(this.radioSelect==0 && this.selectedItems.length==0){
        this.associates.filter(x=>this.selectedLocation>0 ? x.LocationID==this.selectedLocation : x.LocationID!=0).forEach( element => {
          element.DepartmentID>0 ?
          this.selectedItems.push(
            new SelectItem(element.AssociateID,element.FullName)
          ):true
        });
        this.getResult();
      } 
      else{
        var associateRpt:AssociateRpt[]=[];
        var skillsetRpt:SkillsetRpt[]=[];
        var departmentRpt:DepartmentRpt[]=[];
        var lastTimeWorkedOnRpt:LastTimeWorkedOnRpt[]=[];
        this.isLoading=await true;
        for(let selectedItem of this.selectedItems){
          this.progressFor=selectedItem.text

          if(this.radioSelect==0){
            var assoc = await this.associateReportSvc.getAssociateReport(selectedItem.id,this.dateFrom,this.dateTo)
            if(assoc!=null){
              this.progress+=1;
              associateRpt.push(assoc);
            }
          }
          else if (this.radioSelect==1){
            var skills = await  this.skillsetReportSvc.getSkillsetReport(selectedItem.id,this.selectedLocation,this.dateFrom,this.dateTo)
            if(skills!=null){
              this.progress+=1;
              skillsetRpt.push(skills)
            }
          }
          else if (this.radioSelect==2){
            var depts=await   this.departmentReportSvc.getDepartmentReport(selectedItem.id,this.selectedLocation,this.dateFrom,this.dateTo)
            if(depts!=null){
              this.progress+=1;
              departmentRpt.push(depts)
            }
          }
          else if(this.radioSelect==3){
            var lastwork =await   this.lastWorkedOnReportSvc.getLastWorkedOnReport(selectedItem.text,this.selectedLocation,this.dateFrom,this.dateTo)
            console.log(lastwork)
            if(lastwork!=null){
              this.progress+=1;
              lastTimeWorkedOnRpt.push(lastwork)
            }
          }

        }
        this.associateRpt=associateRpt;
        this.departmentRpt=departmentRpt;
        this.lastTimeWorkedOnRpt=lastTimeWorkedOnRpt;
        this.skillsetRpt=skillsetRpt;
        this.isLoading=await false;
        console.log(this.lastTimeWorkedOnRpt)
      }
    }
    this.isPrintReady=await true; 
    this.isRunReportReady=await true;
  }

  compareDate():boolean{
    let result:boolean=false;
    result=(this.dateFrom==null||this.dateTo==null) 
      ? (true) 
      // ? (alert('Two Dates are Required'),false) 
      : (this.dateFrom>this.dateTo) 
        ? (alert('Date From is later than Date to.'),false) 
        : true;
    return result;
  }

  compareRequiredFields():boolean{
    let result:boolean=false;
    result=(this.selectedLocation==-1)
    ?(alert('Location is Required'),false)
    :(this.selectedItems.length==0)
    // ? (alert('Please choose filter first.'),false)
      ? true
      : true
    
    return result;
  }

  //ng2-select on select
  public refreshValue(value:any):void {
    this.selectedItems = value;
  } 
}


// async chromeExportToExcel(){
  //   var data_type = 'data:application/vnd.ms-excel';
  //   var table_div = document.getElementById('assocRpt');
  //   var table_html = table_div.outerHTML.replace(/ /g, '%20');

  //   var a = document.createElement('a');
  //   a.href = data_type + ', ' + table_html;
  //   a.download = await this.getReportName() + '.xls';
  //   a.click();
  // }
  
  // async ieExportToExcel(){
  //   var table_div = document.getElementById('assocRpt');
  //   var table_html = table_div.outerHTML;
  //   var tab_text=table_html;
    
  //   var txtArea1:HTMLIFrameElement=<HTMLIFrameElement>document.getElementById('txtArea1');

  //   tab_text= tab_text.replace(/<A[^>]*>|<\/A>/g, "");//remove if u want links in your table
  //   tab_text= tab_text.replace(/<img[^>]*>/gi,""); // remove if u want images in your table
  //   tab_text= tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params

  //   var iWindow = txtArea1.contentWindow
    
  //     iWindow.document.open("txt/html","replace");
  //     iWindow.document.write(tab_text);
  //     iWindow.document.close();
  //     txtArea1.focus(); 
  //     iWindow.document.execCommand("SaveAs",true,await this.getReportName() +".xls");
  // }

  // async getReportName():Promise<string>{
  //   var str='';

  //   if(this.radioSelect==0)
  //     str='AssociateReport';
  //   else if(this.radioSelect==1)
  //     str='SkillsetReport';
  //   else if(this.radioSelect==2)
  //     str='DepartmentReport';
  //   return new Promise<string>((resolve)=>
  //     resolve(str+new Date().toLocaleDateString())
  //   );
  // }

  //print(){
    //determine if ie or chrome
    // var ua = window.navigator.userAgent;
    // var msie = ua.indexOf("MSIE ");

    // if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
    //   // alert('i am currently using IE');
    //   this.ieExportToExcel();
    // }
    // //chrome / ff
    // else{
      // this.chromeExportToExcel();
    // }

  // }//
import { Component,OnInit,ViewChild,ElementRef  } from '@angular/core';
import { Router }  from '@angular/router';
//services
import { SkillsetSvc } from '../com_services/skillset.svc';
import { DepartmentSvc } from '../com_services/department.svc';
import { AssociateSvc } from '../com_services/associate.svc';
import { LocationSvc } from '../com_services/location.svc';
import { Set_UserSvc } from '../com_services/set_user.svc';
import { DataAssociateReport } from './data/data-associate.reports';
import { DataSkillsetReport } from './data/data-skillset.reports';
import { DataDepartmentReport } from './data/data-department.reports';
import { DataLastworkedonReport } from './data/data-lastworkedon.reports';
let jsPDF = require('jspdf');
import 'hammerjs';
//entities
import { Location,Department,Skillset,
  Associate,Set_User,ng2Items,
  AssociateRpt,SelectItem,
  SkillsetRpt,DepartmentRpt,LastTimeWorkedOnRpt
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
    private setUserSvc:Set_UserSvc,
    private associateReportSvc:DataAssociateReport,
    private skillsetReportSvc:DataSkillsetReport,
    private departmentReportSvc:DataDepartmentReport,
    private lastWorkedOnReportSvc:DataLastworkedonReport,
    private router:Router
  ){

  }
  @ViewChild('assocRpt') el:ElementRef;
  radioSelect:number=0;
  selectedLocation:number=-1;
  public yourVariableName: any=[];
  //initial collection
  skillsets: Skillset[] = [];
  locations:Location[]=[];
  departments:Department[]=[];
  associates:Associate[]=[];
  set_Users:Set_User[]=[];
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

  async print(){
    //determine if ie or chrome
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
      // alert('i am currently using IE');
      this.ieExportToExcel();
    }
    //chrome / ff
    else{
      this.chromeExportToExcel();
    }

  }
  async chromeExportToExcel(){
    var data_type = 'data:application/vnd.ms-excel';
    var table_div = document.getElementById('assocRpt');
    var table_html = table_div.outerHTML.replace(/ /g, '%20');

    var a = document.createElement('a');
    a.href = data_type + ', ' + table_html;
    // a.download = 'exported_table_' + Math.floor((Math.random() * 9999999) + 1000000) + '.xls';
    a.download = await this.getReportName() + '.xls';
    a.click();
  }
  async ieExportToExcel(){
    var table_div = document.getElementById('assocRpt');
    var table_html = table_div.outerHTML;
    var tab_text=table_html;
    
    var txtArea1:HTMLIFrameElement=<HTMLIFrameElement>document.getElementById('txtArea1');

    tab_text= tab_text.replace(/<A[^>]*>|<\/A>/g, "");//remove if u want links in your table
    tab_text= tab_text.replace(/<img[^>]*>/gi,""); // remove if u want images in your table
    tab_text= tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params

    var iWindow = txtArea1.contentWindow
    
      iWindow.document.open("txt/html","replace");
      iWindow.document.write(tab_text);
      iWindow.document.close();
      txtArea1.focus(); 
      iWindow.document.execCommand("SaveAs",true,await this.getReportName() +".xls");
  }

  async getReportName():Promise<string>{
    var str='';

    if(this.radioSelect==0)
      str='AssociateReport';
    else if(this.radioSelect==1)
      str='SkillsetReport';
    else if(this.radioSelect==2)
      str='DepartmentReport';
    return new Promise<string>((resolve)=>
      resolve(str+new Date().toLocaleDateString())
    );
  }

  ngOnInit(){
    this.getDependencies()
    .then(()=>{
        if(this.set_Users!=null){
          this.removeInactive().then(()=>{
              this.getItems();
          });
        }
        else{
          this.router.navigate(['/noaccess']);
        }
    });
  }

  async getDependencies(){
    this.associates = await this.associateSvc.getAssociates();
    this.locations = await this.locationSvc.getLocations();
    this.departments = await this.departmentSvc.getDepartments();
    this.set_Users = await this.setUserSvc.getSet_Users();
    this.skillsets=await this.skillsetSvc.getSkillsets();
  }
  
  async removeInactive(){
    this.locations=await this.locations.filter(x=>x.IsActive==true);
    this.departments=await this.departments.filter(x=>x.IsActive==true);
    this.associates=await this.associates.filter(x=>x.IsActive==true);
    this.skillsets=await this.skillsets.filter(x=>x.IsActive==true);
  }

  async getItems(){
    this.items=[];
    this.yourVariableName=[];
    this.associateRpt=[];
    this.skillsetRpt=[];
    this.selectedItems=[];
    if(this.radioSelect==0){
      let associates=this.associates.filter(x=>x.LocationID==this.selectedLocation);
      for(var i = 0; i<associates.length;i++){
        var fullName=this.getFullName(associates[i].UserName);
        this.items.push( { 'id': associates[i].AssociateID.toString(), 'text': this.getFullName(associates[i].UserName)});
      }
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
    this.associateRpt=[];
    this.skillsetRpt=[];
    this.departmentRpt=[];
    this.lastTimeWorkedOnRpt=[];
    if(this.compareRequiredFields()&&this.compareDate()) 
    {
      for(let selectedItem of this.selectedItems){
        if(this.radioSelect==0){
          await this.associateReportSvc.getAssociateReport(selectedItem.id,this.dateFrom,this.dateTo)
          .then(a=>{
            //console.log(a);
            if(a!=null){
              this.associateRpt.push(a);
            }
          });
        }
        else if (this.radioSelect==1){
          await this.skillsetReportSvc.getSkillsetReport(selectedItem.id,this.selectedLocation,this.dateFrom,this.dateTo)
          .then(a=>this.skillsetRpt.push(a));
        }
        else if (this.radioSelect==2){
          await this.departmentReportSvc.getDepartmentReport(selectedItem.id,this.selectedLocation,this.dateFrom,this.dateTo).
          then(a=>this.departmentRpt.push(a));
          //console.log(this.departmentRpt);
        }
        else if(this.radioSelect==3){
          await this.lastWorkedOnReportSvc.getLastWorkedOnReport(selectedItem.text,this.selectedLocation,this.dateFrom,this.dateTo)
          .then(a=>this.lastTimeWorkedOnRpt.push(a));
        }
      }
    }
  }

  compareDate():boolean{
    let result:boolean=false;
    result=(this.dateFrom==null||this.dateTo==null) 
      ? (alert('Two Dates are Required'),false) 
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
      ? (alert('Please choose filter first.'),false)
      : true

    return result;
  }

  getFullName(username:string):string{
    let user:Set_User= this.set_Users.find(x=>x.user_name==username);
    return user==null ? null : user.user_first_name + ' ' + user.user_last_name
  }
  //ng2-select on select
  public refreshValue(value:any):void {
    this.selectedItems = value;
  }
 
}

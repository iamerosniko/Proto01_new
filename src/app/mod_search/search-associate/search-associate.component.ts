import { Component, OnInit, Input } from '@angular/core';
import { AssociateRpt,DepartmentSkills } from '../../com_entities/entities';
@Component({
  selector: 'search-associate',
  templateUrl: './search-associate.component.html',
  styleUrls: ['./search-associate.component.css']
})
export class SearchAssociateComponent implements OnInit {
@Input() associate:AssociateRpt;
  deptSkillsGrp:DepartmentSkills[][]=[];

  constructor() { }

  ngOnInit() {
    this.sliceToFour();
  }
  //separate departmentskills to 4 parts. 
  sliceToFour(){
    this.deptSkillsGrp=[];
    var ctr=0,listCtr=0;
    var tempList:DepartmentSkills[]=[];
    for (let app of this.associate.DepartmentSkills) {
      tempList.push(app);
      ctr+=1;
      listCtr+=1;
      if(ctr==4 || listCtr==this.associate.DepartmentSkills.length){
        this.deptSkillsGrp.push(tempList);
        ctr=0;
        tempList=[];
      }
    }
  }
}

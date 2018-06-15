import { Component, OnInit, Input } from '@angular/core';
import { AssociateRpt,DepartmentSkills } from '../../../com_entities/entities';
@Component({
  selector: 'associate-skills',
  templateUrl: './associate-skills.component.html',
  styleUrls: ['./associate-skills.component.css']
})
export class AssociateSkillsComponent implements OnInit {
@Input() assoc:AssociateRpt;
  constructor() { }

  ngOnInit() {
  }

  getStatus(status:string):string {
    return status=="true" ? "Yes" : "No";
  }

}

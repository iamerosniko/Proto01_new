import { Component, OnInit, Input } from '@angular/core';
import { DepartmentSkills } from '../../../com_entities/entities';
@Component({
  selector: 'department-skills',
  templateUrl: './department-skills.component.html',
  styleUrls: ['./department-skills.component.css']
})
export class DepartmentSkillsComponent implements OnInit {
@Input() departmentSkill:DepartmentSkills;
  constructor() { }

  ngOnInit() {
  }

}

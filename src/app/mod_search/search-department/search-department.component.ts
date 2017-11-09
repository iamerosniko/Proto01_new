import { Component, OnInit, Input } from '@angular/core';
import { DepartmentRpt } from '../../com_entities/entities';

@Component({
  selector: 'search-department',
  templateUrl: './search-department.component.html',
  styleUrls: ['./search-department.component.css']
})
export class SearchDepartmentComponent implements OnInit {
@Input() departmentRpt:DepartmentRpt;
  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { SkillsetRpt } from '../../com_entities/entities';
@Component({
  selector: 'search-skillset',
  templateUrl: './search-skillset.component.html',
  styleUrls: ['./search-skillset.component.css']
})
export class SearchSkillsetComponent implements OnInit {
@Input() skillsetRpt:SkillsetRpt;
  constructor() { }

  ngOnInit() {
  }

}
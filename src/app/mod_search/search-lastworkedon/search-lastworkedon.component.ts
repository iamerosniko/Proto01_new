import { Component, OnInit, Input } from '@angular/core';
import { LastTimeWorkedOnRpt } from '../../com_entities/entities';
@Component({
  selector: 'search-lastworkedon',
  templateUrl: './search-lastworkedon.component.html',
  styleUrls: ['./search-lastworkedon.component.css']
})
export class SearchLastworkedonComponent implements OnInit {

  constructor() { }
  @Input() lastTimeWorkedOnRpt:LastTimeWorkedOnRpt;
  ngOnInit() {
    console.log(this.lastTimeWorkedOnRpt);
  }

}

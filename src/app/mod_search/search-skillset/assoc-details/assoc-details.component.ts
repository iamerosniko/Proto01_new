import { Component, OnInit, Input } from '@angular/core';
import { AssociateDetails } from '../../../com_entities/entities';
@Component({
  selector: 'assoc-details',
  templateUrl: './assoc-details.component.html',
  styleUrls: ['./assoc-details.component.css']
})
export class AssocDetailsComponent implements OnInit {
@Input() AssociateDetails:AssociateDetails[];
  constructor() { }

  ngOnInit() {
  }

}

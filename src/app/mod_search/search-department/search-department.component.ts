import { Component, OnInit, Input } from '@angular/core';
import { DepartmentRpt,Associate } from '../../com_entities/entities';
import { AssociateSvc } from '../../com_services/associate.svc';

@Component({
  selector: 'search-department',
  templateUrl: './search-department.component.html',
  styleUrls: ['./search-department.component.css']
})
export class SearchDepartmentComponent implements OnInit {
@Input() departmentRpt:DepartmentRpt;
@Input() locationID:number;
@Input() dateFrom:Date;
@Input() dateTo:Date;

  constructor(private assocSvc : AssociateSvc) { }
  associates:Associate[]=[];

  async ngOnInit() {
    if(this.departmentRpt.AssociateRpts.length==0){
      this.associates = (await this.assocSvc.getAssociates())
        .filter(x=>x.DepartmentID==this.departmentRpt.DepartmentID && x.LocationID==this.locationID);
      if (this.dateFrom!=null && this.dateTo!=null){
        this.associates=await this.associates.filter(x=>new Date(x.UpdatedOn)>=this.dateFrom && new Date(x.UpdatedOn)<=this.dateTo)
      }
    }
  }

  getStatus(status:boolean){
    return status ? "Yes" : "No";
  }

}

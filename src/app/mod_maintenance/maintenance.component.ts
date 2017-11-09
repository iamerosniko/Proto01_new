import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute }  from '@angular/router';
@Component({
  selector: 'maintenance',
  templateUrl: 'maintenance.component.html',
})
export class MaintenanceComponent implements OnInit {
  constructor(private router: Router, private route:ActivatedRoute){
    this.goView("Locations");
  }
  goView(path:string){
    this.router.navigate(['/maintenance', {outlets: {'maintenance-route': [path]}}]);
  }
  ngOnInit(){
    this.goView("Locations");
  }
}

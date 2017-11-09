import { 
  Component, 
  OnInit 
} from '@angular/core';
import { 
  Person,
  PERSONS
} from '../com_entities/mck_testexport'
import { ExcelService } from '../com_services/excel.service';

@Component({
  selector: 'test-export',
  templateUrl: './mod-test-export.component.html',
  styleUrls: ['./mod-test-export.component.css']
})
export class ModTestExportComponent implements OnInit {
  persons: Person[];

  constructor( 
      private excelService: ExcelService) { 
    this.excelService = excelService;
  }

  ngOnInit() {
    this.persons = PERSONS;
  }

  exportToExcel(event) {
    this.excelService.exportAsExcelFile(this.persons, 'personAko');
  }
}

import { NgModule } from '@angular/core';
import { ModTestExportComponent } from './mod-test-export.component'
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ModTestExportRouting } from './mod-test-export.routing';
import { ExcelService } from '../com_services/excel.service';

@NgModule({
    declarations:[
        ModTestExportComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        ModTestExportRouting
    ],
    providers: [
        ExcelService
    ],
    exports: [
        ModTestExportComponent
    ]
})

export class TestExportModule {}

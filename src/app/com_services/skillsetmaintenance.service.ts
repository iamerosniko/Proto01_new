import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AppSettings } from '../com_entities/app_settings';
@Injectable()
export class SkillsetMaintenanceServices {
    private headers = new Headers({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT'
    });
    private apiUrl = AppSettings.CURRENT_URL + 'Clean';

    constructor(private http: Http){}

    cleanme():Promise<any>{
        return this.http
            .post(this.apiUrl, {headers: this.headers})
            .toPromise()
            .then(response => response.json())
            .catch(AppSettings.HANDLEERROR);
    }

    
}

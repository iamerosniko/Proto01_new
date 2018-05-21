import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { BTAM } from '../com_entities/entities';
import { AppSettings } from '../com_entities/app_settings';
@Injectable()
export class BTAMSvc {
    private headers = new Headers({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT'
    });
    private apiUrl = AppSettings.CURRENT_URL + 'BTAM';

    constructor(private http: Http){}

    getBTAMURL(): Promise<BTAM> {
        return this.http
            .get(this.apiUrl, {headers: this.headers})
            .toPromise()
            .then(response => response.json())
            .catch(AppSettings.HANDLEERROR);
    }
}

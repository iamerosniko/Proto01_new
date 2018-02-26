import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { MyToken } from '../com_entities/entities';
import { AppSettings } from '../com_entities/app_settings';
@Injectable()
export class MyTokenSvc {
    private headers = new Headers({'Content-Type': 'application/json'});
    private apiUrl = AppSettings.CURRENT_MVC + 'Users/GetToken';

    constructor(private http: Http){}

    getTokens(): Promise<MyToken> {
        return this.http
                .post(this.apiUrl, {headers: this.headers})
                .toPromise()
                .then(response => response.json())
                .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}

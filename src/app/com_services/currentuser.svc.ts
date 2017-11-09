import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { User } from '../com_entities/entities';
import { AppSettings } from '../com_entities/app_settings';
@Injectable()
export class CurrentUserSvc {
    private headers = new Headers({'Content-Type': 'application/json'});
    // private apiUrl = 'api/CurrentUser';
    //private apiUrl = 'https://skillsetazureuat.azurewebsites.net/api/CurrentUser';
    //private apiUrl = 'https://skillsetazure.azurewebsites.net/api/CurrentUser';
    private apiUrl = AppSettings.CURRENT_URL + 'CurrentUser';

    constructor(private http: Http){}

    getCurrentUser(): Promise<User> {
        return this.http
                .get(this.apiUrl, {headers: this.headers})
                .toPromise()
                .then(response => response.json())
                .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}

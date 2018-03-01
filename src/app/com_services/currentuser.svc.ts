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
    private apiUrl = AppSettings.CURRENT_MVC + 'Users/GetCurrentUser';

    constructor(private http: Http){}

    getCurrentUser(): Promise<User> {
        return new Promise<User>((resolve)=>resolve(JSON.parse(window.atob(sessionStorage.getItem("Cache2")))))
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}

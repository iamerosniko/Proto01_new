import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { User,SignedInUser,MyToken } from '../com_entities/entities';
import { AppSettings } from '../com_entities/app_settings';
@Injectable()
export class CurrentUserSvc {
    private headers = new Headers({'Content-Type': 'application/json'});
    // private apiUrl = 'api/CurrentUser';
    //private apiUrl = 'https://skillsetazureuat.azurewebsites.net/api/CurrentUser';
    //private apiUrl = 'https://skillsetazure.azurewebsites.net/api/CurrentUser';
    private apiUrl ="";

    constructor(private http: Http){}

    // async getCurrentUser(): Promise<User> {
    //     this.apiUrl = AppSettings.CURRENT_URL + 'CurrentUsers';
    //     return this.http
    //     .get(this.apiUrl, {headers: this.headers})
    //     .toPromise()
    //     .then(response => response.json())
    //     .catch(this.handleError);
    // }

    async getSignedInUser(): Promise<User> {
        this.apiUrl = AppSettings.CURRENT_URL + "Claims/SignedInUserName";
        return this.http
        .get(this.apiUrl,{headers:this.headers})
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
    }

    async GetAuthenticationToken(user : User):Promise<MyToken>{
        this.apiUrl = AppSettings.CURRENT_URL + "Claims/Authenticate";
        return this.http
        .post(this.apiUrl,JSON.stringify(user),{headers:this.headers})
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
    }

    async GetAuthorizationToken(token : MyToken):Promise<MyToken>{
        this.apiUrl = AppSettings.CURRENT_URL + "Claims/AuthorizeUser";
        return this.http
        .post(this.apiUrl,JSON.stringify(token),{headers:this.headers})
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}

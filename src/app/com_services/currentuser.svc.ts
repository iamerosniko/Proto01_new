import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { User,MyToken } from '../com_entities/entities';
import { AppSettings } from '../com_entities/app_settings';
@Injectable()
export class CurrentUserSvc {
    private headers = new Headers({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT'
    });
    private apiUrl ="";

    constructor(private http: Http){}

    async getSignedInUser(): Promise<User> {
        this.apiUrl = AppSettings.CURRENT_URL + "Claims/SignedInUserName";
        return this.http
        .get(this.apiUrl,{headers:this.headers})
        .toPromise()
        .then(response => response.json())
        .catch(AppSettings.HANDLEERROR);
    }

    async GetAuthenticationToken(user : User):Promise<MyToken>{
        this.apiUrl = AppSettings.CURRENT_URL + "Claims/Authenticate";
        return this.http
        .post(this.apiUrl,JSON.stringify(user),{headers:this.headers})
        .toPromise()
        .then(response => response.json())
        .catch(AppSettings.HANDLEERROR);
    }

    async GetUserRolesFromBtam(username : string):Promise<User>{
        this.apiUrl=sessionStorage.getItem("BTAM_URL")+"AppSignIn";
        // console.log(sessionStorage.getItem("BTAM_URL"));
        // var appSignIn = { "AppURL":window.location.hostname,"UserName":username }
        var appSignIn = { "AppURL":"skillsetclient.azurewebsites.net","UserName":username }

        return this.http
        .post(this.apiUrl,JSON.stringify(appSignIn),{headers:this.headers})
        .toPromise()
        .then(response => response.json())
        .catch(AppSettings.HANDLEERROR);
    }

    async GetUserInAppFromBtam():Promise<User[]>{
        this.apiUrl=sessionStorage.getItem("BTAM_URL")+"GetUsersInApp";
        // var appSignIn = { "AppURL":window.location.hostname,"UserName":username }
        var appSignIn = { "AppURL":"skillsetclient.azurewebsites.net" }

        return this.http
        .post(this.apiUrl,JSON.stringify(appSignIn),{headers:this.headers})
        .toPromise()
        .then(response => response.json())
        .catch(AppSettings.HANDLEERROR);
    }

    async GetAuthenticationTokenFromBtam(user : User):Promise<MyToken>{
        this.apiUrl=sessionStorage.getItem("BTAM_URL")+"Authenticate/77fee2aa-d346-4f48-aeff-73b4254f1b3a";
        //this.apiUrl = "http://localhost:49475/api/SingleSignIn/Authenticate/77fee2aa-d346-4f48-aeff-73b4254f1b3a";
        // this.apiUrl = "http://btaccessmanagementbw-dev.azurewebsites.net/api/SingleSignIn/Authenticate/77fee2aa-d346-4f48-aeff-73b4254f1b3a";
    
        return this.http
        .post(this.apiUrl,JSON.stringify(user),{headers:this.headers})
        .toPromise()
        .then(response => response.json())
        .catch(AppSettings.HANDLEERROR);
    }


    //window.location.hostname
    async GetAuthorizationToken(token : MyToken):Promise<MyToken>{
        this.apiUrl = AppSettings.CURRENT_URL + "Claims/AuthorizeUser";
        return this.http
        .post(this.apiUrl,JSON.stringify(token),{headers:this.headers})
        .toPromise()
        .then(response => response.json())
        .catch(AppSettings.HANDLEERROR);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}

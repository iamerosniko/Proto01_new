import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Set_User_Access } from '../com_entities/entities';
import { AppSettings } from '../com_entities/app_settings';
@Injectable()
export class Set_User_AccessSvc {
    private headers = new Headers({'Content-Type': 'application/json'});
    // private apiUrl = 'api/Set_User';
    //private apiUrl = 'https://skillsetazureuat.azurewebsites.net/api/Set_User';
    //private apiUrl = 'https://skillsetazure.azurewebsites.net/api/Set_User';
    private apiUrl = AppSettings.CURRENT_URL + 'Set_User_access';

    constructor(private http: Http){}

    getSet_Users_Accesses(): Promise<Set_User_Access[]> {
        return this.http
                .get(this.apiUrl, {headers: this.headers})
                .toPromise()
                .then(response => response.json())
                .catch(AppSettings.HANDLEERROR);
    }

    getSet_Users_Access(id: number): Promise<Set_User_Access> {
        const url = `${this.apiUrl}/${id}`;
        return this.http
                .get(url)
                .toPromise()
                .then(response => response.json())
                .catch(AppSettings.HANDLEERROR);
    }

    postSet_User_Access(entity: Set_User_Access):Promise<any>{
        return this.http
            .post(this.apiUrl, JSON.stringify(entity), {headers: this.headers})
            .toPromise()
            .then(() => entity)
            .catch(AppSettings.HANDLEERROR);
    }

    putSet_User_Access(entity: Set_User_Access): Promise<any> {
        const url = `${this.apiUrl}/${entity.user_id}`;
        return this.http
            .put(url, JSON.stringify(entity), {headers: this.headers})
            .toPromise()
            .then(() => entity)
            .catch(AppSettings.HANDLEERROR);
    }

    DeleteSet_User_Access(id: number): Promise<boolean> {
        const url = `${this.apiUrl}/${id}`;
        return this.http
            .delete(url, {headers: this.headers})
            .toPromise()
            .then(() => true)
            .catch(AppSettings.HANDLEERROR);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}

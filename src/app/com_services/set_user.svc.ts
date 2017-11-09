import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Set_User } from '../com_entities/entities';
import { AppSettings } from '../com_entities/app_settings';
@Injectable()
export class Set_UserSvc {
    private headers = new Headers({'Content-Type': 'application/json'});
    // private apiUrl = 'api/Set_User';
    //private apiUrl = 'https://skillsetazureuat.azurewebsites.net/api/Set_User';
    //private apiUrl = 'https://skillsetazure.azurewebsites.net/api/Set_User';
    private apiUrl = AppSettings.CURRENT_URL + 'Set_User';

    constructor(private http: Http){}

    getSet_Users(): Promise<Set_User[]> {
        return this.http
                .get(this.apiUrl, {headers: this.headers})
                .toPromise()
                .then(response => response.json())
                .catch(this.handleError);
    }

    getSet_User(id: number): Promise<Set_User> {
        const url = `${this.apiUrl}/${id}`;
        return this.http
                .get(url)
                .toPromise()
                .then(response => response.json())
                .catch(this.handleError);
    }

    postSet_User(entity: Set_User):Promise<any>{
        return this.http
            .post(this.apiUrl, JSON.stringify(entity), {headers: this.headers})
            .toPromise()
            .then(() => entity)
            .catch(this.handleError);
    }

    putSet_User(entity: Set_User): Promise<any> {
        const url = `${this.apiUrl}/${entity.user_id}`;
        return this.http
            .put(url, JSON.stringify(entity), {headers: this.headers})
            .toPromise()
            .then(() => entity)
            .catch(this.handleError);
    }

    DeleteSet_User(id: number): Promise<boolean> {
        const url = `${this.apiUrl}/${id}`;
        return this.http
            .delete(url, {headers: this.headers})
            .toPromise()
            .then(() => true)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}

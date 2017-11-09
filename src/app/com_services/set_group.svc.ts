import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Set_Group } from '../com_entities/entities';
import { AppSettings } from '../com_entities/app_settings';
@Injectable()
export class Set_GroupSvc {
    private headers = new Headers({'Content-Type': 'application/json'});
    // private apiUrl = 'api/Set_Groups';
    //private apiUrl = 'https://skillsetazureuat.azurewebsites.net/api/Set_Groups';
    //private apiUrl = 'https://skillsetazure.azurewebsites.net/api/Set_Groups';
    private apiUrl = AppSettings.CURRENT_URL + 'Set_Group';

    constructor(private http: Http){}

    getSet_Groups(): Promise<Set_Group[]> {
        return this.http
                .get(this.apiUrl, {headers: this.headers})
                .toPromise()
                .then(response => response.json())
                .catch(this.handleError);
    }

    getSet_Group(id: number): Promise<Set_Group> {
        const url = `${this.apiUrl}/${id}`;
        return this.http
                .get(url)
                .toPromise()
                .then(response => response.json())
                .catch(this.handleError);
    }

    postSet_Group(entity: Set_Group):Promise<any>{
        return this.http
            .post(this.apiUrl, JSON.stringify(entity), {headers: this.headers})
            .toPromise()
            .then(() => entity)
            .catch(this.handleError);
    }

    putSet_Group(entity: Set_Group): Promise<any> {
        const url = `${this.apiUrl}/${entity.grp_id}`;
        return this.http
            .put(url, JSON.stringify(entity), {headers: this.headers})
            .toPromise()
            .then(() => entity)
            .catch(this.handleError);
    }

    DeleteSet_Group(id: number): Promise<boolean> {
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

import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Set_User_Access } from '../com_entities/entities';
import { AppSettings } from '../com_entities/app_settings';
@Injectable()
export class Set_User_AccessSvc {
    private headers=new Headers({});
    private apiUrl = AppSettings.CURRENT_API + 'Set_User_access';

    constructor(private http: Http){
        this.headers = new Headers();
        this.headers.append('Authorization','Bearer '+localStorage.getItem('cache1'));
        this.headers.append('Content-Type','application/json');
    }

    getSet_Users_Accesses(): Promise<Set_User_Access[]> {
        return this.http
                .get(this.apiUrl, {headers: this.headers})
                .toPromise()
                .then(response => response.json())
                .catch(this.handleError);
    }

    getSet_Users_Access(id: number): Promise<Set_User_Access> {
        const url = `${this.apiUrl}/${id}`;
        return this.http
                .get(url)
                .toPromise()
                .then(response => response.json())
                .catch(this.handleError);
    }

    postSet_User_Access(entity: Set_User_Access):Promise<any>{
        return this.http
            .post(this.apiUrl, JSON.stringify(entity), {headers: this.headers})
            .toPromise()
            .then(() => entity)
            .catch(this.handleError);
    }

    putSet_User_Access(entity: Set_User_Access): Promise<any> {
        const url = `${this.apiUrl}/${entity.user_id}`;
        return this.http
            .put(url, JSON.stringify(entity), {headers: this.headers})
            .toPromise()
            .then(() => entity)
            .catch(this.handleError);
    }

    DeleteSet_User_Access(id: number): Promise<boolean> {
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

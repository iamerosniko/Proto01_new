import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Set_Module } from '../com_entities/entities';
import { AppSettings } from '../com_entities/app_settings';
@Injectable()
export class Set_ModuleSvc {
    private headers = new Headers({'Content-Type': 'application/json'});
    // private apiUrl = 'api/Set_Modules';
    //private apiUrl = 'https://skillsetazureuat.azurewebsites.net/api/Set_Modules';
    //private apiUrl = 'https://skillsetazure.azurewebsites.net/api/Set_Modules';
    private apiUrl = AppSettings.CURRENT_URL + 'Set_Modules';

    constructor(private http: Http){}

    getSet_Modules(): Promise<Set_Module[]> {
        return this.http
                .get(this.apiUrl, {headers: this.headers})
                .toPromise()
                .then(response => response.json())
                .catch(AppSettings.HANDLEERROR);
    }

    getSet_Module(id: number): Promise<Set_Module> {
        const url = `${this.apiUrl}/${id}`;
        return this.http
                .get(url)
                .toPromise()
                .then(response => response.json())
                .catch(AppSettings.HANDLEERROR);
    }

    postSet_Module(entity: Set_Module):Promise<any>{
        return this.http
            .post(this.apiUrl, JSON.stringify(entity), {headers: this.headers})
            .toPromise()
            .then(() => entity)
            .catch(AppSettings.HANDLEERROR);
    }

    putSet_Module(entity: Set_Module): Promise<any> {
        const url = `${this.apiUrl}/${entity.mod_id}`;
        return this.http
            .put(url, JSON.stringify(entity), {headers: this.headers})
            .toPromise()
            .then(() => entity)
            .catch(AppSettings.HANDLEERROR);
    }

    DeleteSet_Module(id: number): Promise<boolean> {
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

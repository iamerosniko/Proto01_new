import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AssociateDepartmentSkillset } from '../com_entities/entities';
import { AppSettings } from '../com_entities/app_settings';
@Injectable()
export class AssociateDepartmentSkillsetsSvc {
    private headers = new Headers({'Content-Type': 'application/json'});
    // private apiUrl = 'api/AssociateDepartmentSkillsets';
    //private apiUrl = 'https://skillsetazureuat.azurewebsites.net/api/AssociateDepartmentSkillsets';
    //private apiUrl = 'https://skillsetazure.azurewebsites.net/api/AssociateDepartmentSkillsets';
    private apiUrl = AppSettings.CURRENT_URL + 'AssociateDepartmentSkillsets';

    constructor(private http: Http){}

    getAssociateDeptSkillsets(): Promise<AssociateDepartmentSkillset[]> {
        return this.http
                .get(this.apiUrl, {headers: this.headers})
                .toPromise()
                .then(response => response.json())
                .catch(this.handleError);
    }

    getAssociateDeptSkillset(id: string): Promise<AssociateDepartmentSkillset> {
        const url = `${this.apiUrl}/${id}`;
        return this.http
                .get(url)
                .toPromise()
                .then(response => response.json())
                .catch(this.handleError);
    }

    postAssociateDeptSkillset(entity: AssociateDepartmentSkillset):Promise<any>{
        return this.http
            .post(this.apiUrl, JSON.stringify(entity), {headers: this.headers})
            .toPromise()
            .then(() => entity)
            .catch(this.handleError);
    }

    putAssociateDeptSkillset(entity: AssociateDepartmentSkillset): Promise<any> {
        const url = `${this.apiUrl}/${entity.AssociateDepartmentSkillsetID}`;
        return this.http
            .put(url, JSON.stringify(entity), {headers: this.headers})
            .toPromise()
            .then(() => entity)
            .catch(this.handleError);
    }

    DeleteAssociateDeptSkillset(id: number): Promise<boolean> {
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

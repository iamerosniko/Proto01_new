import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AssociateDepartmentSkillset } from '../com_entities/entities';
import { AppSettings } from '../com_entities/app_settings';
@Injectable()
export class AssociateDepartmentSkillsetsSvc {
    private headers = new Headers({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT'
    });
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
                .catch(AppSettings.HANDLEERROR);
    }

    getAssociateDeptSkillset(id: string): Promise<AssociateDepartmentSkillset> {
        const url = `${this.apiUrl}/${id}`;
        return this.http
                .get(url)
                .toPromise()
                .then(response => response.json())
                .catch(AppSettings.HANDLEERROR);
    }

    postAssociateDeptSkillset(entity: AssociateDepartmentSkillset):Promise<any>{
        return this.http
            .post(this.apiUrl, JSON.stringify(entity), {headers: this.headers})
            .toPromise()
            .then(() => entity)
            .catch(AppSettings.HANDLEERROR);
    }

    putAssociateDeptSkillset(entity: AssociateDepartmentSkillset): Promise<any> {
        const url = `${this.apiUrl}/${entity.AssociateDepartmentSkillsetID}`;
        return this.http
            .put(url, JSON.stringify(entity), {headers: this.headers})
            .toPromise()
            .then(() => entity)
            .catch(AppSettings.HANDLEERROR);
    }

    DeleteAssociateDeptSkillset(id: number): Promise<boolean> {
        const url = `${this.apiUrl}/${id}`;
        return this.http
            .delete(url, {headers: this.headers})
            .toPromise()
            .then(() => true)
            .catch(AppSettings.HANDLEERROR);
    }

    
}

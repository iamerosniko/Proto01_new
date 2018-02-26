import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { DepartmentSkillsets } from '../com_entities/entities';
import { AppSettings } from '../com_entities/app_settings';
@Injectable()
export class DepartmentSkillsetsSvc {
    
    private headers=new Headers({});
    private apiUrl = AppSettings.CURRENT_API + 'DepartmentSkillsets';

    constructor(private http: Http){
        this.headers = new Headers();
        this.headers.append('Authorization','Bearer '+localStorage.getItem('cache1'));
        this.headers.append('Content-Type','application/json');
    }

    getDepartmentSkillsets(): Promise<DepartmentSkillsets[]> {
        return this.http
                .get(this.apiUrl, {headers: this.headers})
                .toPromise()
                .then(response => response.json())
                .catch(this.handleError);
    }

    getDepartmentSkillset(id: string): Promise<DepartmentSkillsets> {
        const url = `${this.apiUrl}/${id}`;
        return this.http
                .get(url)
                .toPromise()
                .then(response => response.json())
                .catch(this.handleError);
    }

    postDepartmentSkillset(entity: DepartmentSkillsets):Promise<any>{
        return this.http
            .post(this.apiUrl, JSON.stringify(entity), {headers: this.headers})
            .toPromise()
            .then(() => entity)
            .catch(this.handleError);
    }

    putDepartmentSkillset(entity: DepartmentSkillsets): Promise<any> {
        const url = `${this.apiUrl}/${entity.DepartmentID}`;
        return this.http
            .put(url, JSON.stringify(entity), {headers: this.headers})
            .toPromise()
            .then(() => entity)
            .catch(this.handleError);
    }

    DeleteDepartmentSkillset(id: number): Promise<boolean> {
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

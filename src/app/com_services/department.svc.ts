import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Department } from '../com_entities/entities';
import { AppSettings } from '../com_entities/app_settings';
@Injectable()
export class DepartmentSvc {
    private headers = new Headers({'Content-Type': 'application/json'});
    // private apiUrl = 'api/Departments';
    //private apiUrl = 'https://skillsetazureuat.azurewebsites.net/api/Departments';
    //private apiUrl = 'https://skillsetazure.azurewebsites.net/api/Departments';
    private apiUrl = AppSettings.CURRENT_URL + 'Departments';

    constructor(private http: Http){}

    getDepartments(): Promise<Department[]> {
        return this.http
                .get(this.apiUrl, {headers: this.headers})
                .toPromise()
                .then(response => response.json())
                .catch(AppSettings.HANDLEERROR);
    }

    getDepartment(id: number): Promise<Department> {
        const url = `${this.apiUrl}/${id}`;
        return this.http
                .get(url)
                .toPromise()
                .then(response => response.json())
                .catch(AppSettings.HANDLEERROR);
    }

    postDepartment(entity: Department):Promise<any>{
        return this.http
            .post(this.apiUrl, JSON.stringify(entity), {headers: this.headers})
            .toPromise()
            .then(() => entity)
            .catch(AppSettings.HANDLEERROR);
    }

    putDepartment(entity: Department): Promise<any> {
        const url = `${this.apiUrl}/${entity.DepartmentID}`;
        return this.http
            .put(url, JSON.stringify(entity), {headers: this.headers})
            .toPromise()
            .then(() => entity)
            .catch(AppSettings.HANDLEERROR);
    }

    DeleteDepartment(id: number): Promise<boolean> {
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

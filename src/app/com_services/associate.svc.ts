import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Associate } from '../com_entities/entities';
import { AppSettings } from '../com_entities/app_settings';
@Injectable()
export class AssociateSvc {
    private headers = new Headers({'Content-Type': 'application/json'});
    // private apiUrl = 'api/Associates';
    //private apiUrl = 'https://skillsetazureuat.azurewebsites.net/api/Associates';
    //private apiUrl = 'https://skillsetazure.azurewebsites.net/api/Associates';
    private apiUrl = AppSettings.CURRENT_URL + 'Associates';

    constructor(private http: Http){}

    getAssociates(): Promise<Associate[]> {
        return this.http
                .get(this.apiUrl, {headers: this.headers})
                .toPromise()
                .then(response => response.json())
                .catch(this.handleError);
    }

    getAssociate(id: number): Promise<Associate> {
        const url = `${this.apiUrl}/${id}`;
        return this.http
                .get(url)
                .toPromise()
                .then(response => response.json())
                .catch(this.handleError);
    }

    postAssociate(entity: Associate):Promise<any>{
        return this.http
            .post(this.apiUrl, JSON.stringify(entity), {headers: this.headers})
            .toPromise()
            .then(() => entity)
            .catch(this.handleError);
    }

    putAssociate(entity: Associate): Promise<any> {
        const url = `${this.apiUrl}/${entity.AssociateID}`;
        return this.http
            .put(url, JSON.stringify(entity), {headers: this.headers})
            .toPromise()
            .then(() => entity)
            .catch(this.handleError);
    }

    DeleteAssociate(id: number): Promise<boolean> {
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

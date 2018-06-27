import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Associate } from '../com_entities/entities';
import { AppSettings } from '../com_entities/app_settings';
@Injectable()
export class AssociateSvc {
    private headers = new Headers({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT'
    });
    
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
                .catch(AppSettings.HANDLEERROR);
    }

    getAssociate(id: number): Promise<Associate> {
        const url = `${this.apiUrl}/${id}`;
        return this.http
                .get(url)
                .toPromise()
                .then(response => response.json())
                .catch(AppSettings.HANDLEERROR);
    }

    postAssociate(entity: Associate):Promise<any>{
        return this.http
            .post(this.apiUrl, JSON.stringify(entity), {headers: this.headers})
            .toPromise()
            .then(() => entity)
            .catch(AppSettings.HANDLEERROR);
    }

    postAssociates(entity: Associate[]):Promise<any>{
        return this.http
            .post(this.apiUrl+"/Bulk", JSON.stringify(entity), {headers: this.headers})
            .toPromise()
            .then(() => entity)
            .catch(AppSettings.HANDLEERROR);
    }

    putAssociate(entity: Associate): Promise<any> {
        const url = `${this.apiUrl}/${entity.AssociateID}`;
        return this.http
            .put(url, JSON.stringify(entity), {headers: this.headers})
            .toPromise()
            .then(() => entity)
            .catch(AppSettings.HANDLEERROR);
    }

    DeleteAssociate(id: number): Promise<boolean> {
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

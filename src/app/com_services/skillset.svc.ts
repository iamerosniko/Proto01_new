import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Skillset } from '../com_entities/entities';
import { AppSettings } from '../com_entities/app_settings';
@Injectable()
export class SkillsetSvc {
    private headers = new Headers({'Content-Type': 'application/json'});
    // private apiUrl = 'api/Skillsets';
    //private apiUrl = 'https://skillsetazureuat.azurewebsites.net/api/Skillsets';
    //private apiUrl = 'https://skillsetazure.azurewebsites.net/api/Skillsets';
    private apiUrl = AppSettings.CURRENT_URL + 'Skillsets';

    constructor(private http: Http){}

    getSkillsets(): Promise<Skillset[]> {
        return this.http
                .get(this.apiUrl, {headers: this.headers})
                .toPromise()
                .then(response => response.json())
                .catch(AppSettings.HANDLEERROR);
    }

    getSkillset(id: number): Promise<Skillset> {
        const url = `${this.apiUrl}/${id}`;
        return this.http
                .get(url)
                .toPromise()
                .then(response => response.json())
                .catch(AppSettings.HANDLEERROR);
    }

    postSkillset(entity: Skillset):Promise<any>{
        return this.http
            .post(this.apiUrl, JSON.stringify(entity), {headers: this.headers})
            .toPromise()
            .then(() => entity)
            .catch(AppSettings.HANDLEERROR);
    }

    putSkillset(entity: Skillset): Promise<any> {
        const url = `${this.apiUrl}/${entity.SkillsetID}`;
        return this.http
            .put(url, JSON.stringify(entity), {headers: this.headers})
            .toPromise()
            .then(() => entity)
            .catch(AppSettings.HANDLEERROR);
    }

    DeleteSkillset(id: number): Promise<boolean> {
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

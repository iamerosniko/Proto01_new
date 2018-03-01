import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Location } from '../com_entities/entities';
import { AppSettings } from '../com_entities/app_settings';
@Injectable()
export class LocationSvc {
    
    private headers=new Headers({});
    private apiUrl = AppSettings.CURRENT_API + 'Locations';

    constructor(private http: Http,){
        this.headers = new Headers();
        this.headers.append('Authorization','Bearer '+sessionStorage.getItem('Cache0'));
        this.headers.append('Content-Type','application/json');
        //this.apiUrl=this.config.getUrl(true);
    }

    getLocations(): Promise<Location[]> {
        return this.http
                .get(this.apiUrl, {headers: this.headers})
                .toPromise()
                .then(response => response.json())
                .catch(this.handleError);
    }

    getLocation(id: number): Promise<Location> {
        const url = `${this.apiUrl}/${id}`;
        return this.http
                .get(url)
                .toPromise()
                .then(response => response.json())
                .catch(this.handleError);
    }

    postLocation(entity: Location):Promise<any>{
        return this.http
            .post(this.apiUrl, JSON.stringify(entity), {headers: this.headers})
            .toPromise()
            .then(() => entity)
            .catch(this.handleError);
    }

    putLocation(entity: Location): Promise<any> {
        const url = `${this.apiUrl}/${entity.LocationID}`;
        return this.http
            .put(url, JSON.stringify(entity), {headers: this.headers})
            .toPromise()
            .then(() => entity)
            .catch(this.handleError);
    }

    DeleteLocation(id: number): Promise<boolean> {
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

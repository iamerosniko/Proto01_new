import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Location } from '../com_entities/entities';
import { AppSettings } from '../com_entities/app_settings';
@Injectable()
export class LocationSvc {
    private headers = new Headers({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT'
    });
    //private apiUrl ='api/Locations';
    //private apiUrl = 'https://skillsetazureuat.azurewebsites.net/api/Locations';
    //private apiUrl = 'https://skillsetazure.azurewebsites.net/api/Locations';
    private apiUrl = AppSettings.CURRENT_URL + 'Locations';

    constructor(private http: Http,
        ){
        //this.apiUrl=this.config.getUrl(true);
    }

    getLocations(): Promise<Location[]> {
        return this.http
                .get(this.apiUrl, {headers: this.headers})
                .toPromise()
                .then(response => response.json())
                .catch(AppSettings.HANDLEERROR);
    }

    getLocation(id: number): Promise<Location> {
        const url = `${this.apiUrl}/${id}`;
        return this.http
                .get(url)
                .toPromise()
                .then(response => response.json())
                .catch(AppSettings.HANDLEERROR);
    }

    postLocation(entity: Location):Promise<any>{
        return this.http
            .post(this.apiUrl, JSON.stringify(entity), {headers: this.headers})
            .toPromise()
            .then(() => entity)
            .catch(AppSettings.HANDLEERROR);
    }

    putLocation(entity: Location): Promise<any> {
        const url = `${this.apiUrl}/${entity.LocationID}`;
        return this.http
            .put(url, JSON.stringify(entity), {headers: this.headers})
            .toPromise()
            .then(() => entity)
            .catch(AppSettings.HANDLEERROR);
    }

    DeleteLocation(id: number): Promise<boolean> {
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

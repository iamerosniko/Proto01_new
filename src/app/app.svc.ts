import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AppSettings } from './com_entities/app_settings';

@Injectable()
export class AppService{
  private headers = new Headers({'Content-Type': 'application/json'});
  private apiUrl = 'http://localhost:63222/api/Applications';
  constructor(private http: Http){
  }

  getAssociateSkillsets(): Promise<any[]> {
      return this.http
              .get(this.apiUrl, {headers: this.headers})
              .toPromise()
              .then(response => response.json())
              .catch(AppSettings.HANDLEERROR);
  }
  private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
  }
}

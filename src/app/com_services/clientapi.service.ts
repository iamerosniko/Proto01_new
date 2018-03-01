import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { ClientApiSettings } from './clientapi.settings';
@Injectable()
export class ClientApiService {

  public apiUrl = '';
  public headers = new Headers({});

  constructor(private http:Http) { }

  public authorizedHeader(){
    this.headers=new Headers([
      {'authorization':'Nearer '+sessionStorage.getItem('Cache1')},
      {'Content-Type': 'application/json'}
    ]);
  }

  public normalHeader(){
    this.headers=new Headers({'Content-Type': 'application/json'});
  }

  async getAll() {  
    return this.http
      .get(this.apiUrl, {headers: this.headers})
      .toPromise()
      .then(res=>res.json());
  }

  async getOne(id:string){
    var apiurl= this.apiUrl +'/'+id
    return this.http
      .get(apiurl, {headers: this.headers})
      .toPromise()
      .then(res=>res.json());
  }  

  async postData(body:string){
    return this.http
      .post(this.apiUrl, body, {headers: this.headers})
      .toPromise()
      .then(res=>res.json());
  }

  async putData(body:string,ID:string){
    const url = `${this.apiUrl}/${ID}`;
    return this.http
      .put(url, body, {headers: this.headers})
      .toPromise()
      .then(res=>res.json());
  }

  async deleteData(ID:string){
    const url = `${this.apiUrl}/${ID}`;
    return this.http
      .delete(url, {headers: this.headers})
      .toPromise()
      .then(res=>res.json());
  }
}
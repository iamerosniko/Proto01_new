import { Injectable } from '@angular/core';
import { ClientApiService } from './clientapi.service'; 
import { ClientApiSettings } from './clientapi.settings'; 
@Injectable()
export class LoginService {

  constructor(private api:ClientApiService) {
    api.normalHeader();
  }

  getCurrentToken(){
    this.api.apiUrl=ClientApiSettings.GETCLIENTAPIURL("GetCurrentToken");
    var res = this.api.getAll()
    return res;
  }

  GetAuthenticationToken(currentUser:string){
    this.api.apiUrl=ClientApiSettings.GETAPIURL("Login");
    var res = this.api.postData(currentUser);
    // console.log(<MyToken>res);
    return res;
  }

  GetCurrentCredentials(){
    this.api.apiUrl=ClientApiSettings.GETCLIENTCONTROLLERURL("Home/GetUserCreds");
    var res = this.api.getAll();
    return res
  }

  GetCurrentUser(token:string){
    this.api.apiUrl=ClientApiSettings.GETCLIENTCONTROLLERURL("Home/TokenToDetails");
    var token1 = { 'TokenValue':token }
    var currentUser = this.api.postData(JSON.stringify(token1));

    return (currentUser)
  }

  GetAuthorizationToken(){
    this.api.apiUrl=ClientApiSettings.GETCLIENTAPIURL("ProvideAuthorizationToken");
    var res = this.api.getAll()
    // console.log(<MyToken>res);
    return res;
  }

  Logout(){
    this.api.apiUrl=ClientApiSettings.GETCLIENTAPIURL("Logout");
    this.api.getAll();
  }
  
}
import { Component, OnInit } from '@angular/core';
import { LoginService } from  '../../com_services/login.service';
import { Router } from '@angular/router';
import { User } from '../../com_entities/entities';
@Component({
  selector: 'app-load-items',
  templateUrl: './load-items.component.html',
  styleUrls: ['./load-items.component.css']
})
export class LoadItemsComponent implements OnInit {

  constructor(private loginService :LoginService,private router: Router) { }

  ngOnInit() {
    this.Login();
  }

  async Login(){

    //getCurrent User's username
    var currentCreds =<User>await this.loginService.GetCurrentCredentials();
    // currentCreds.UserID

    var authenticationToken = await this.loginService.GetAuthenticationToken(JSON.stringify(currentCreds));
    // var authorizationToken = await this.loginService.GetAuthorizationToken();    
    var currentUser =<User> await this.loginService.GetCurrentUser(authenticationToken);
    console.log(currentUser);
    await sessionStorage.setItem("Cache0",authenticationToken);
    // await sessionStorage.setItem("Cache1",authorizationToken);
    await sessionStorage.setItem("Cache2",window.btoa(JSON.stringify(currentUser)));
    

    setTimeout(() => {
      if(currentUser.Role.toLowerCase() == "limited")
        this.router.navigate(['./skillset'])
      else if(currentUser.Role.toLowerCase() == "admin") 
        this.router.navigate(['./search'])
      
    }, 3000);
  }

}

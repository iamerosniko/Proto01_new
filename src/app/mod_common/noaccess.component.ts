import { Component } from '@angular/core';
@Component({
  selector: 'no-access',
  template: `
    <div class="col-md-12">
      <div class="col-md-8 col-md-offset-2">
          <div class="bs-callout bs-callout-danger" style="background-color:white;">
              <h4><i class="fa fa-warning"></i> Oops! You are not authorized to view this page.</h4>
              <p>The page you are trying to access is restricted due to a security rule.</p>
              <p>If you think this is an error, please contact site administrator.</p>
          </div>
      </div>
    </div>
    `,
})
export class NoAccessComponent {
  constructor(){

  }
}

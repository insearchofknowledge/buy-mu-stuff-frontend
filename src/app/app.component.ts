import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
//import 'rxjs/add/operator/finally';
import { AppService } from './services/app.service';
import { AuthService } from './services/auth.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title ='BuyMyStuff';

  constructor(private authService: AuthService, private http: HttpClient, private router: Router) {

    // this.authService.addIfAuthenticatedToCache(false);
      //this.authService.authenticate(undefined, undefined);
    }
 

}

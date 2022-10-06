import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
//import 'rxjs/add/operator/finally';
import { AppService } from './services/app.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title ='BuyMyStuff';

  constructor(private app: AppService, private http: HttpClient, private router: Router) {
      this.app.authenticate(undefined, undefined);
    }
    // logout() {
    //   this.http.post('logout', {}).finalize(() => {
    //       this.app.authenticated = false;
    //       this.router.navigateByUrl('/home');
    //   }).subscribe();
    // }

}

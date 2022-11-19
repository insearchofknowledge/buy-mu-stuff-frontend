import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  public credentials = { username: '', password: '' };
  public error = false;
  public fieldTextType: boolean = false;
 // public isAuthenticated = false;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router) {
    // this.subscriptions.push(
    //   this.authService.isAuthenticated.subscribe(authenticationStatus => {
    //     this.isAuthenticated = authenticationStatus;
    //   })
    // )
  }

  // ngOnDestroy(): void {
  //   this.subscriptions.forEach(sub => sub.unsubscribe());
  // }



  ngOnInit(): void {
  }

  login() {
    this.authService.authenticate(this.credentials, () => {
      this.authService.addIfAuthenticatedToCache(true);
      //this.isAuthenticated = true;
      //this.authService.isAuthenticated.next(this.isAuthenticated);
      this.router.navigateByUrl('/allProducts').then(()=>{
        window.location.reload();
      });
    });
    return false;
  }

  // For showing / hiding password
  changeFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

}

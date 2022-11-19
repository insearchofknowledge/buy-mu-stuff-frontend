import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../dto/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //public isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  // public isLoggedIn = false;
  // public isAuthenticated = false;
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) { }

  // public login() {
  //   this.isLoggedIn = true;
  // }

  // public logout() {
  //   this.isLoggedIn = false;
  // }

  public authenticate(credentials, callback) {

    const headers = new HttpHeaders(credentials ? {
      authorization: 'Basic ' + btoa(credentials.username + ':' + credentials.password)
    } : {});

    this.login(headers).subscribe({
      next: (response: HttpResponse<User>) => {
        console.log(response.body.email);
        if (response.body != null) {
          this.addUserToCache(response.body);
          // this.isAuthenticated = true;
        }
        return callback && callback();
      },
      error: (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse.message);
      }
    })

    

    // this.http.get('/api/user', { headers: headers }).subscribe(response => {

    //   if (response['name']) {
    //     this.authenticated = true;
    //   } else {
    //     this.authenticated = false;
    //   }
    //   return callback && callback();
    // }, err => console.log(err));
  }

  public isUserLoggedin():boolean{
    if(this.getIfAuthentiCatedFromCache()==true){
      console.log(this.getIfAuthentiCatedFromCache());
      return true;
    }else{
      return false;
    }
  }

  public login(headers: HttpHeaders): Observable<HttpResponse<User>> {
    return this.httpClient.get<User>('/api/user', { headers: headers, observe: 'response' })
  }

  public addUserToCache(user: User): void {
    console.log(JSON.stringify(user))
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUserFromCache(): User {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  public addIfAuthenticatedToCache(isAuthenticated:boolean){
    localStorage.setItem('isLoggedIn',String(isAuthenticated));
  }

  public getIfAuthentiCatedFromCache():boolean{
    return Boolean((localStorage.getItem('isLoggedIn')));
  }

  public logout(headers: HttpHeaders){
    this.httpClient.post<void>(`${this.apiServerUrl}/logout`, { headers: headers, observe: 'response' });
    localStorage.clear();
  }

  // logout() {
  //      this.http.post('logout', {}).finalize(() => {
  //          this.app.authenticated = false;
  //          this.router.navigateByUrl('/home');
  //      }).subscribe();
  //    }

  // public isAuthenticated() {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve(this.isLoggedIn);
  //     },
  //       1000);
  //   });
  // }
}

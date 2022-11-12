import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public credentials = { username: '', password: '' };
  public error = false;
  public fieldTextType: boolean = false;

  constructor(private app: AppService, private http: HttpClient, private router: Router) {
  }

  login() {
    this.app.authenticate(this.credentials, () => {
      this.router.navigateByUrl('/home');
    });
    return false;
  }

  ngOnInit(): void {
  }

  changeFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

}

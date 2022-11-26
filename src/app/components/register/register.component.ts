import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public fieldTextType: boolean = false;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router) { }

  registerForm: FormGroup;
  ngOnInit(): void {

    this.registerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.nullValidator, Validators.pattern("[a-zA-Z ]*")]),
      lastName: new FormControl('', [Validators.required, Validators.nullValidator, Validators.pattern("[a-zA-Z ]*")]),
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('', [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[A-Za-zd!@#$%^&*()_+].{8,15}")]),
      phoneNumber: new FormControl(''),
      county: new FormControl(''),
      city: new FormControl('', [Validators.required, Validators.nullValidator, Validators.pattern("[a-zA-Z ]*")]),
      street: new FormControl('', [Validators.required, Validators.nullValidator, Validators.pattern("[a-zA-Z ]*")]),
      zipCode: new FormControl('')
      //"(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,15}"
    })
  }


  public onRegister(): void {
    this.userService.register(this.registerForm.value).subscribe({
      next: (response: string) => {
        console.log(response);
      },
      error: (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse);
      }
    })
    this.router.navigate(['/login']);
  }

  // For displaying / hiding password
  public changeFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

}

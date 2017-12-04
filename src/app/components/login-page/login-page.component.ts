import { Component }  from '@angular/core';
import { Router } from '@angular/router';
import { 
        FormBuilder, 
        FormGroup, 
        Validators }  from '@angular/forms';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      user: [ '', Validators.required ],
      pass: [ '', Validators.required ]
    });
  }

  onSubmit() {
    console.log("Login form submitted");
    //TODO: indicate that user logged in.
  }

  cancelLogin() {
    this.router.navigate(['']); //go back home
  }

}

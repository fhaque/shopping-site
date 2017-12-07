import { Component, OnInit }  from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import { 
        FormBuilder, 
        FormGroup, 
        Validators }  from '@angular/forms';
import { IAppState } from '../../models/app.model';
import { Observable } from 'rxjs';
import { UserActions } from '../../actions/user.actions';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  loginError$: Observable<string>;
  loginHeaderMsg: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private ngRedux: NgRedux<IAppState>,
    private userActions: UserActions
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.loginError$ = this.ngRedux
      .select<string>(['currentUserState', 'loginError']);

    this.route.queryParams.subscribe( params => this.loginHeaderMsg = params.msg );
  }

  createForm() {
    this.loginForm = this.fb.group({
      user: [ '', Validators.required ],
      pass: [ '', Validators.required ]
    });
  }

  onSubmit() {
    const user: string = this.loginForm.value.user;
    const pass: string = this.loginForm.value.pass;
    console.log("Login form submitted");
    //TODO: indicate that user logged in.
    this.ngRedux.dispatch( this.userActions.loginStarted(user, pass) );    
  }

  cancelLogin() {
    this.router.navigate(['']); //go back home
  }

}

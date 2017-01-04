import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SignUpService } from './signup.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { AuthService } from '../../services/auth/auth.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  providers: [SignUpService, AuthService]
})
export class SignupPage {
  message: string;
  error: string;

  public signupForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpService: SignUpService, public formBuilder: FormBuilder, private http: Http, private authHttp: AuthHttp, public auth: AuthService) {
    this.signupForm = formBuilder.group({
      firstName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      email: [''],
      phoneNumber: ['', Validators.compose([Validators.maxLength(15), Validators.minLength(10), Validators.required])],
      password: ['', Validators.compose([Validators.maxLength(30), Validators.minLength(6), Validators.required])]
    })
  }

  ionViewDidLoad() {}

  signup(userInfo) {
    this.httpService.signupPost(userInfo)
      .subscribe(data => {
        console.log("Oooh....I'm afraid..the signupform..will be..quite operational...when your friends arrive")
      })
  };

  securedTest() {
  // Here we use authHttp to make an authenticated request to the server
  this.authHttp.get('http://localhost:8080/secured/test')
    .map(res => res.json())
    .subscribe(
      data => this.message = data.text,
      err => this.error = err
    );
  }

}

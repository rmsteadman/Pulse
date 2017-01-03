import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SignupService } from './signup.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  providers: [SignupService]
})
export class SignupPage {
  public signupForm: FormGroup;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public httpService: SignupService, public formBuilder: FormBuilder) {
    this.signupForm = formBuilder.group({
      firstName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      email: [''],
      phoneNumber: ['', Validators.compose([Validators.maxLength(15), Validators.minLength(10), Validators.required])],
      password: ['', Validators.compose([Validators.maxLength(30), Validators.minLength(6), Validators.required])]
    })
  }

  ionViewDidLoad() {}

  signup(something) {
    this.httpService.signupPost(something)
      .subscribe(data => {
        console.log("subscribed to signup post observable")
      })
  };


}

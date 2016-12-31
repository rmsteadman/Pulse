import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SignupService } from './signup.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'





@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  providers: [SignupService]
})
export class SignupPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpService: SignupService) {

  }

  ionViewDidLoad() {

  }

  signup(something) {
    this.httpService.signupPost(something)
      .subscribe(data => {
        console.log('aha...Data: ', data)
      })
  };


}

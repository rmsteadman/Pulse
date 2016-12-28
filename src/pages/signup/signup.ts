import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SignupService } from './signup.service.service';
/*
  Generated class for the Signup page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  providers: [SignupService]
})
export class SignupPage {

  constructor(public navCtrl: NavController, public navParams: NavParams /*, httpService: SignupService*/) {}

  getData: string;
  postData: string;

  ionViewDidLoad() {

  }

  onTestGet() {
    // this.httpService.getCurrentTime()
    console.log('Hello pooper')
  }


}

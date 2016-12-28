import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SignupService } from './signup.service';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpService: SignupService) {}

  public getData = [];
  postData: string;

  ionViewDidLoad() {

  }

  onTestGet() {
    console.log('You clicked me')
    this.httpService.getCurrentTime()
    // need to subscribe to returned observable
    //see testing app at first component
      // .subscribe(data => {
      //   console.log('A Data: ', data)
      // })
  }


}

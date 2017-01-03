import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  public categories = ['Hiking', 'Video Games', 'Marijuana', 'Gym', 'Surfing', 'Programming', 'Gambling', 'Food', 'Exploring', 'Extreme', 'Sailing', 'Party'];
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  addPreference(things) {
    this.categories.push(things)
  }

  savePreferences() {
    this.categories.forEach((pref) => {
      // if (pref.checked){
        console.log(pref)
      // }
    })
  }


}

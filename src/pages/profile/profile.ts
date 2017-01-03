import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  public categories = [];
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    //make get request for preference list
  }

  addPreference(things) {
    this.categories.push({
      preference: things,
      checked: true
    })
  }

  savePreferences() {
    
    this.categories.forEach(preference => {console.log(preference)})
    
  }

  toggleCheck(preferenceEntry) {
    preferenceEntry.checked = !preferenceEntry.checked;
    console.log(preferenceEntry.checked)
  }


}

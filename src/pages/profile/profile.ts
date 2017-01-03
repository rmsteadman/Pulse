import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PreferenceService } from './profile.service';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers: [PreferenceService]
})
export class ProfilePage {

  public categories = [];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public httpService: PreferenceService) {}

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
    
    // this.categories.forEach(preference => {console.log(preference)})
    this.httpService.savePreferences(this.categories)
  }

  toggleCheck(preferenceEntry) {
    preferenceEntry.checked = !preferenceEntry.checked;
    console.log(preferenceEntry.checked)
  }


}

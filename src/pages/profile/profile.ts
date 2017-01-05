import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PreferenceService } from './profile.service';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers: [PreferenceService]
})
export class ProfilePage {

  public preferences = [
    {
      preference: 'Active',
      icon: 'walk',
      checked: true
    },
    {
      preference: 'Learn',
      icon: 'school',
      checked: true
    },
    {
      preference: 'Community',
      icon: 'people',
      checked: true
    },
    {
      preference: 'Eat/Drink',
      icon: 'pizza',
      checked: true
    },
    {
      preference: 'Music',
      icon: 'musical-notes',
      checked: true
    },
    {
      preference: 'Travel',
      icon: 'globe',
      checked: true
    },
    {
      preference: 'Art',
      icon: 'image',
      checked: true
    },
    {
      preference: 'Games',
      icon: 'game-controller-a',
      checked: true
    },
    {
      preference: 'Featured',
      icon: 'star',
      checked: true
    }
  ];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public httpService: PreferenceService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    // this.httpService.getPreferences()
    //   .subscribe(data => {
    //     console.log('subscribe to get observable')
    //   })
  }

  // addPreference(things) {
  //   this.preferences.push({
  //     preference: things,
  //     checked: true
  //   })
  // }

  savePreferences() {
    
    // this.categories.forEach(preference => {console.log(preference)})
    this.httpService.savePreferences(this.preferences)
  }

  toggleCheck(preferenceEntry) {
    preferenceEntry.checked = !preferenceEntry.checked;
    console.log(preferenceEntry.checked)
  }


}

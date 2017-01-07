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
    this.httpService.getPreferences()
      .subscribe(data => {
        let prefsArray = data;
        let count = 0;
        console.log('this is profile data:', prefsArray);
        prefsArray.forEach(pref => {
          // stop at featured: last preference;
          if(count === 9) {
            return;
          }
          (!!prefsArray[count]) ? this.preferences[count].checked = true : this.preferences[count].checked = false;
          count++;
        })
        console.log('this is loaded profile view:', this.preferences);
      })
  }

  savePreferences() {
    let updatedPreferences = [];
    this.preferences.forEach(preference => {
      if (preference.checked === true){
        updatedPreferences.push(1)
      } else {
        updatedPreferences.push(0)
      }

    })
    console.log(JSON.stringify(updatedPreferences))
    this.httpService.savePreferences(updatedPreferences)
      .subscribe(data => {
        console.log("Preferences SUCCESS?")
      })
  }

  toggleCheck(preferenceEntry) {
    preferenceEntry.checked = !preferenceEntry.checked;
    console.log(preferenceEntry.checked)
  }


}

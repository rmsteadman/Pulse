import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { HomePage } from '../home/home';
import { BeaconService } from './create-beacon.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare var google;

@Component({
  selector: 'page-create-beacon',
  templateUrl: 'create-beacon.html',
  providers: [BeaconService]
})
export class CreateBeaconPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  public beaconForm: FormGroup;
  public categoryChoice;

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpService: BeaconService, public formBuilder: FormBuilder) {
      this.beaconForm = formBuilder.group({
      title: ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      details: ['', Validators.compose([Validators.maxLength(255), Validators.required])]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateBeaconPage');
  }


  createBeacon(beaconInfo){

    console.log(this.categoryChoice)
    beaconInfo.category = this.categoryChoice;
    console.log(beaconInfo);
    this.httpService.beaconPost(beaconInfo)
        .subscribe(data => {
          console.log("Beacons have categories now")
        })

    this.navCtrl.setRoot(HomePage); //switch this to load the page everytime if async happens
    
    }
}

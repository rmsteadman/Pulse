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

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpService: BeaconService, public formBuilder: FormBuilder) {
      this.beaconForm = formBuilder.group({
      title: ['', Validators.compose([Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      details: ['', Validators.compose([Validators.maxLength(255), Validators.pattern('[a-zA-Z ]*'), Validators.required])]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateBeaconPage');
  }

  createBeacon(userInfo){
  
  this.httpService.beaconPost(userInfo)
      .subscribe(data => {
        console.log("Oooh....I'm afraid..the BACONS..will be..quite operational...when your friends arrive")
      })

  this.navCtrl.setRoot(HomePage); //switch this to load the page everytime if async happens
  
  }
}

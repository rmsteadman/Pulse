import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BeaconListService } from './beacon-list.service';


@Component({
  selector: 'page-beacon-list',
  templateUrl: 'beacon-list.html',
  providers: [BeaconListService]
})
export class BeaconListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpService: BeaconListService) {}

  public user;


  ionViewDidLoad() {
    console.log('ionViewDidLoad BeaconListPage');
    this.getMyBeacons()
  }

  getMyBeacons() {
    this.httpService.getBeaconList();

  }

  deleteBeacon(beacon) {
    console.log('you clicked me')
  }

}

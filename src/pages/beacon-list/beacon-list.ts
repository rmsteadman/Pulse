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
  public beaconList = [];

  ionViewDidLoad() {
    console.log('ionViewDidLoad BeaconListPage');
    this.getMyBeacons()
  }

  getMyBeacons() {
    let userId = localStorage.getItem('userId')
    console.log(userId)
    this.httpService.getBeaconList(userId)
      .subscribe(data => {
        console.log('there is data: ', data)
        data.forEach(beacon => {
          this.beaconList.unshift(beacon)
        })
      })

  }

  deleteBeacon(beacon) {
    this.httpService.deleteBeacon(beacon)
      .subscribe(data => {
        console.log('Deleted')
      })
  }

}

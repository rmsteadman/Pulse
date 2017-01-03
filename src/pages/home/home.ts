import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { CreateBeaconPage } from '../create-beacon/create-beacon'
<<<<<<< HEAD
import { BeaconService } from '../create-beacon/create-beacon.service';

declare var google;

let beaconData;


@Component({
  selector: 'home-page',
  templateUrl: 'home.html',
  providers: [BeaconService]
=======
import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { AuthService } from '../../services/auth/auth.service';
import 'rxjs/add/operator/map';

declare var google;

@Component({
  selector: 'home-page',
  templateUrl: 'home.html',
  providers: [AuthService]
>>>>>>> feat/auth
})
export class HomePage {

  createBeacon: any = CreateBeaconPage;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
<<<<<<< HEAD
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public httpService: BeaconService) {}
 
=======

  constructor(
    public navCtrl: NavController,
    public auth: AuthService
  ) {}

>>>>>>> feat/auth
  ionViewDidLoad(){
    // Auth Lock
    this.auth.login();
    this.loadMap();
    this.loadBeacon();
    
  }

  loadMap(){

    Geolocation.getCurrentPosition()
      .then((position) => {

        let center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        let mapOptions = {
          center: center,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      }, (err) => {
        console.log(err);
      });

  }

  loadBeacon() {
      this.httpService.getBeaconsAll()
  }


  addBeacon(){
<<<<<<< HEAD
    this.navCtrl.push(CreateBeaconPage, {
      position: this.map.getCenter()
    });
=======
>>>>>>> feat/auth

    let beacon = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });
<<<<<<< HEAD
    let content = '';          
=======
    localStorage.setItem('currentLocation', beacon.position)
    let content = "TEST";

>>>>>>> feat/auth
    this.addInfoWindow(beacon, content);

  }


  addInfoWindow(beacon, content){

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(beacon, 'click', () => {
      infoWindow.open(this.map, beacon);
    });

    }
}

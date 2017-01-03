import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { CreateBeaconPage } from '../create-beacon/create-beacon'
import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { AuthService } from '../../services/auth/auth.service';
import 'rxjs/add/operator/map';

declare var google;

@Component({
  selector: 'home-page',
  templateUrl: 'home.html',
  providers: [AuthService]
})
export class HomePage {

  createBeacon: any = CreateBeaconPage;
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(
    public navCtrl: NavController,
    public auth: AuthService
  ) {}

  ionViewDidLoad(){
    // Auth Lock
      this.auth.lock.show(function(err, profile, token) {
        if (err) {
          // Error callback
          console.error("Something went wrong: ", err);
        } else {
          // Success callback
          console.log("Access granted.");
          // Save the JWT token.
          localStorage.setItem('userToken', token);
          // Save the profile
          localStorage.setItem('userProfile', JSON.stringify(profile));
          console.log(localStorage.getItem);
        }
      });
      this.auth.lock.on("authenticated", function(authResult) {
        // Use the token in authResult to getProfile() and save it to localStorage
        this.auth.lock.getProfile(authResult.idToken, function(error, profile) {
          if (error) {
            // Handle error
            return;
          }

          localStorage.setItem('idToken', authResult.idToken);
          localStorage.setItem('profile', JSON.stringify(profile));
        });
      });

    this.loadMap();
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

  addBeacon(){

    let beacon = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });
    localStorage.setItem('currentLocation', beacon.position)
    let content = "TEST";

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

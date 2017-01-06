import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { CreateBeaconPage } from '../create-beacon/create-beacon'
import { AuthHttp } from 'angular2-jwt';
import { AuthService } from '../../services/auth/auth.service';
import { BeaconService } from '../create-beacon/create-beacon.service';
import { SignUpService } from '../../pages/signup/signup.service';
import { BeaconInfo } from '../../modals/beacon-info/beacon-info';
import 'rxjs/add/operator/map';

declare var google;

let beaconData;

@Component({
  selector: 'home-page',
  templateUrl: 'home.html',
  providers: [AuthService, BeaconService, SignUpService]
})
export class HomePage {

  createBeacon: any = CreateBeaconPage;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  myData: any;
  token: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public httpService: BeaconService,
    public auth: AuthService,
    public TEST: SignUpService
  ) {}

  ionViewDidLoad(){
    this.loadMap();
    // this.userInit();
  }

  // get user token
  // acquireToken () {
  //   this.auth.getUserToken()
  //     .subscribe(data => {
  //       this.token = data;
  //       console.log('This is the user token', this.token);
  //     })
  // }

  // initialize user authentication
  userInit() {
    // get user login token (in local storage)
    // this.auth.getUserToken()
    let test = this.auth.getUserCreds();
    console.log('this is chkusrcrds', test);
    // console.log(localStorage)
    // if user is logged in, skip lock screen
    // if(true) {
      //return;
    //} else {
      // this.auth.login();
    //}
    // if not logged in, show lock

  }
  openModal(info) {
    let modal = this.modalCtrl.create(BeaconInfo, {
      beacon: info
    });
    console.log(info);
    modal.present();
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
        this.loadBeacon();
      }, (err) => {
        console.log(err);
      });

  }

  loadBeacon() {
    let that = this
      this.httpService.getBeaconsAll()
        .subscribe(data => {
          this.myData = data;
          this.myData.forEach(beaconData =>{
            let beacon = new google.maps.Marker({
            map: that.map,
            animation: google.maps.Animation.DROP,
            position: JSON.parse(beaconData.position)
          })
          let content = {
            title: beaconData.title,
            details: beaconData.details,
            tags: beaconData.tags,
            private: beaconData.private
          }
          that.addInfoWindow(beacon, content);
          })
        })
  }


  addBeacon(){
    this.navCtrl.push(CreateBeaconPage, {
      position: this.map.getCenter()
    });
  }


  addInfoWindow(beacon, content){
    let that = this;
    google.maps.event.addListener(beacon, 'click', () => {
      that.openModal(content)
    })
    // // let infoWindow = new google.maps.InfoWindow({
    // //   content: content
    // // });

    // google.maps.event.addListener(beacon, 'click', () => {
    //   // infoWindow.open(this.map, beacon);
    // });
    // }
  }

}

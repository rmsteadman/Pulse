import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { CreateBeaconPage } from '../create-beacon/create-beacon'
import { AuthHttp } from 'angular2-jwt';
import { AuthService } from '../../services/auth/auth.service';
import { BeaconService } from '../create-beacon/create-beacon.service';
import { SignUpService } from '../../pages/signup/signup.service';
import { BeaconInfo } from '../../modals/beacon-info/beacon-info';
import * as io from 'socket.io-client';
import 'rxjs/add/operator/map';

declare var google;

let beaconData;

@Component({
  selector: 'home-page',
  templateUrl: 'home.html',
  providers: [AuthService, BeaconService, SignUpService]
})
export class HomePage {
  public chatInput;
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
    public TEST: SignUpService,
   
  ) {}

  ionViewDidLoad(){
    this.loadMap();
    this.userInit();
  }

  // initialize user authentication
  userInit() {
    if(localStorage.getItem('userId') === "null") {
      this.auth.login();
    }
  }
  openModal(info) {
    
    let socket = io.connect('http://localhost:8080')    
    let modal = this.modalCtrl.create(BeaconInfo, {
      beacon: info,
      socket: socket,
      chat: this.chatInput
    });
    
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


    let icons = {
      active: {
        icon: 'http://i.imgur.com/WGBgLt7.png'
      },
      art: {
        icon: 'http://i.imgur.com/WyH8zuQ.png'
      },
      community: {
        icon: 'http://i.imgur.com/cKsSFbG.png'
      },
      eat: {
        icon: 'http://i.imgur.com/kzEV39B.png'
      },
      featured: {
        icon: 'http://i.imgur.com/VVbHJjv.png'
      },
      games: {
        icon: 'http://i.imgur.com/bpZdExD.png'
      },
      learn: {
        icon: 'http://i.imgur.com/4nKLb0R.png'
      },
      music: {
        icon: 'http://i.imgur.com/dyk9hBV.png'
      },
      travel: {
        icon: 'http://i.imgur.com/69FWA0V.png'
      },
      other: {
        icon: 'http://i.imgur.com/RgsgSZI.png'
      },
      JB : {
        icon: 'http://i.imgur.com/twiMx0R.png'
      }
    }

            // icon: icons[beaconData].icon

      this.httpService.getBeaconsAll()
        .subscribe(data => {
          this.myData = data;
          this.myData.forEach(beaconData =>{
            let beacon = new google.maps.Marker({
            map: that.map,
            animation: google.maps.Animation.DROP,
            position: JSON.parse(beaconData.position),
            icon: beaconData.icon
          })
          let content = {
            title: beaconData.title,
            details: beaconData.details,
            tags: beaconData.tags,
            private: beaconData.private,
            chatroom: beaconData.chatroomId
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
  }


}

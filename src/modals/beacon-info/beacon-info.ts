import { Component, NgZone } from '@angular/core';
import { ModalController, Platform, NavParams, ViewController, NavController } from 'ionic-angular';
import { rsvpService } from '../rsvp/rsvp.service'
import { BeaconInfoService } from './beacon-info.service';
import * as io from 'socket.io-client';
import { AlertController } from 'ionic-angular';

@Component({
  templateUrl: 'beacon-info.html',
  providers: [BeaconInfoService, rsvpService]
})
export class BeaconInfo {

  public socket = io('http://localhost:8080');
  public chatInput = '';
  beacon: any = this.params.get('beacon');
  chats: any = this.params.get('chat');
  payload: any = {};

  tabToShow : number = 1;


  constructor(
    public zone: NgZone,
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public NavController: NavController,
    public httpService: BeaconInfoService,
    public rsvpService: rsvpService,
    public modalCtrl : ModalController,
    public alertCtrl: AlertController
  ) {
    this.socket.on('message', message => {
      this.zone.run(() => {
        this.chats.push(message)
      })
    })
  }

  ngOnInit() {
    // this.httpService.getMessages(this.beacon.chatroom);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  letsDigest(){
    this.zone.run( () => {
      console.log("I am digesting")
    })
  }

  sendMessage() {
    let messageObject = {
      author: null,
      message: this.chatInput,
      date: Date.now(),
      chatroom: this.beacon.chatroom
    }
    if (this.chatInput !== ''){
      this.socket.emit('message', messageObject);
      this.httpService.sendMessage(messageObject)
        .subscribe(data => {
          console.log("Bweh")
        })
    }
    this.chatInput = '';
  }

  getMessages(chatroom) {
    this.httpService.getMessages(chatroom)
      .subscribe(data => {
        console.log('data: ', data)
      })
  }


  rsvpLoader(info) {
    // TESTING GET ALL RSVPs
    // let rsvps;
    // this.rsvpService.getRsvpAll(this.beacon.id)
    //   .subscribe(results => {
    //     rsvps = results;
    //   })
    // console.log('these are the rsvps:', rsvps);
    let prompt = this.alertCtrl.create({
    title: 'RSVP',
    message: "RSVP for this event! Add any details you want to.",
    inputs: [
      {
        name: 'details',
        placeholder: 'Details'
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Save',
        handler: data => {
          this.payload.id = this.beacon.id;
          this.payload.details = data.details;
          this.payload.token = localStorage.getItem('userId');
          console.log('Saved clicked', this.payload);
          console.log("SAAAVEEE", this.beacon);
          this.rsvpService.rsvpPost(this.payload)
          .subscribe(result => {
          console.log("Beacons have categories now")
          })
        }
      }
    ]
    });
    prompt.present();
  }
  // rsvpLoader(info) {
  //       let modal = this.modalCtrl.create(Rsvp, {
  //         info: info
  //       });
  //       modal.present();
  //     }
}



import { Component, NgZone, ViewChild } from '@angular/core';
import { ModalController, Platform, NavParams, ViewController, NavController } from 'ionic-angular';
import { rsvpService } from '../rsvp/rsvp.service'
import { BeaconInfoService } from './beacon-info.service';
import * as io from 'socket.io-client';
import { AlertController, Content } from 'ionic-angular';

@Component({
  templateUrl: 'beacon-info.html',
  providers: [BeaconInfoService, rsvpService]
})
export class BeaconInfo {

  @ViewChild(Content) content: Content;

  public socket = io('https://ec2-54-67-94-166.us-west-1.compute.amazonaws.com:443');
  public chatInput = '';
  public rsvps = [];
  public author = JSON.parse(localStorage.getItem('profile'))['user_metadata'];
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
    this.socket.on('newRsvp', rsvp => {
      this.zone.run(() => {
        this.rsvps.push(rsvp)
      })
    })
  }

  ngOnInit() {
    this.getAllRsvp();
  }

  gotoBottom() {
    var element = document.getElementById("mychat");
    setTimeout(()=>{element.scrollIntoView(true)},100); 
  };

  dismiss() {
    this.viewCtrl.dismiss();
  }

  letsDigest(){
    this.zone.run( () => {
      console.log("I am digesting")
    })
  }

  sendMessage() {
    let date = new Date().toString();
    date = date.toLocaleString();
    
    let messageObject = {
      author: this.author.firstName + " " + this.author.lastName,
      message: this.chatInput,
      date: date,
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
    this.gotoBottom();
  }

  getMessages(chatroom) {
    this.httpService.getMessages(chatroom)
      .subscribe(data => {
        console.log('data: ', data)
      })
    this.gotoBottom();
  }

  getAllRsvp() {
    let that = this;
    // TESTING GET ALL RSVPs
    this.rsvpService.getRsvpAll(this.beacon.id)
      .subscribe(results => {
        that.rsvps = results;
      })
  }


  rsvpLoader(info) {
    let that = this;
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
          this.payload.User = {
            firstName: this.author.firstName,
            lastName: this.author.lastName
          }
          // let joiner = `${JSON.parse(localStorage.getItem('profile'))['user_metadata'].firstName} ${JSON.parse(localStorage.getItem('profile'))['user_metadata'].lastName}`;
          // this.payload.joiner = joiner;
          this.socket.emit('newRsvp', this.payload);
          console.log(this.payload)
          this.rsvpService.rsvpPost(this.payload)
            .subscribe(result => {
              console.log("Beacons have categories now");
            })
        }
      }
    ]
    });
    prompt.present();
  }
}



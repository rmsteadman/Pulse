import { Component, NgZone } from '@angular/core';
import { ModalController, Platform, NavParams, ViewController, NavController } from 'ionic-angular';
import { BeaconInfoService } from './beacon-info.service';
import * as io from 'socket.io-client';

@Component({
  templateUrl: 'beacon-info.html',
  providers: [BeaconInfoService]
})
export class BeaconInfo {

  public socket = io('http://localhost:8080');
  private chats = [];
  // public zone = NgZone;
  public chatInput = '';
  beacon: any = this.params.get('beacon');

  constructor(
    public zone: NgZone,
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public NavController: NavController,
    public httpService: BeaconInfoService
  ) {
    this.socket.on('message', message => {
      this.zone.run(() => {
        this.chats.push(message)
      })
    })
  }

  ngOnInit() {
    this.httpService.getMessages(this.beacon.chatroom);
  }
  
  dismiss() {
    this.viewCtrl.dismiss();
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

}
import { Component, NgZone } from '@angular/core';
import { ModalController, Platform, NavParams, ViewController, NavController } from 'ionic-angular';
import { MessageService } from './message.service';
import * as io from 'socket.io-client';

@Component({
  templateUrl: 'beacon-info.html',
  providers: [MessageService]
})
export class BeaconInfo {

  public socket = io('http://localhost:8080');
  public chats = [];
  // public zone = NgZone;
  public chatInput = '';
  
  constructor(
    public zone: NgZone,
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public NavController: NavController,
    public httpService: MessageService
  ) {
    this.socket.on('message', message => {
      this.zone.run(() => {
        this.chats.push(message)
      })
    })
  }

  beacon:any = this.params.get('beacon')
  dismiss() {
    this.viewCtrl.dismiss();
  }

  sendMessage() {
    if (this.chatInput !== ''){
      this.socket.emit('message', this.chatInput)
    }
    // this.httpService.sendMessage(message)
    
  }

}
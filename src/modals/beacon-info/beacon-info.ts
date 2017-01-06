import { Component } from '@angular/core';
import { ModalController, Platform, NavParams, ViewController } from 'ionic-angular';
import { Chatroom } from '../chatroom/chat'


@Component({
  templateUrl: 'beacon-info.html'
})
export class BeaconInfo {


  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
  ) {}

  beacon:any = this.params.get('beacon')

  
  

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
import { Component } from '@angular/core';
import { ModalController, Platform, NavParams, ViewController, NavController } from 'ionic-angular';
import { rsvpService } from './rsvp.service';

@Component({
  templateUrl: 'rsvp.html',
  providers: [rsvpService]
})
export class Rsvp {
  info: any = this.params.get('info');

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public NavController: NavController,
    public httpService: rsvpService
  ) {

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
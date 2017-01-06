import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'chatroom',
  templateUrl: 'chat.html'
})
export class Chatroom {

  public messages = [];

  constructor(public navCtrl: NavController) {

  }

  sendMessage(message) {
    console.log(this.messages)
    console.log(message)
    this.messages.push(message);
    
  }

}

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import * as io from 'socket.io-client';

@Injectable()
export class rsvpService {
    public sockets = io('http://localhost:8080');

    constructor(public http: Http) {}





    rsvpPost(info): Observable<any> {
      this.sockets.emit('newRsvp', info)
      return this.http.post('http://localhost:8080/api/rsvps/create', info)
        .map(data => {
          console.log( "This is data", data.json() )
        })
    };



    getRsvpAll(beaconId) : Observable<any> {
      console.log('get rsvp beaconId:', beaconId)
      return this.http.get(`http://localhost:8080/api/rsvps/getall/${beaconId}`)
        .map(data => {
          console.log('Array of RSVPs:', data.json());
          return data.json();
        })
    }


}

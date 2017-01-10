import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable'

@Injectable()
export class rsvpService {

    constructor(public http: Http) {}





    rsvpPost(info): Observable<any> {

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

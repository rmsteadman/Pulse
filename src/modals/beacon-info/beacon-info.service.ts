import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import * as io from 'socket.io-client';


@Injectable()
export class BeaconInfoService {

    constructor(public http: Http) {}

    getMessages(chatroomId): Observable<any> {
            console.log('in the get: ', chatroomId)
            // let config = {
            //   params: {
            //     chatroomId: chatroomId
            //   }
            // }
            return this.http.get(`http://localhost:8080/api/chatrooms/getmessages/${chatroomId}`)
                .map(data => {
                    console.log("This is data from getMessages", data)
                    return data.json();
                })
        }


    sendMessage(message): Observable<any> {
        console.log("THIS IS THE MESSAGE: ", message);

        return this.http.put('http://localhost:8080/api/chatrooms/addmessage', message)
            .map(data => {
                console.log('things are ok')
            })
    };

    deleteBeacon(beacon) {
        console.log("Beacon from the service!!! ", beacon);
        return this.http.delete('http://localhost:8080/api/beacons/deletebeacon', beacon)
            .map(data => {
                console.log('Here is some data bweh: ', data)
            })
    }
}

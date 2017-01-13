import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';



@Injectable()
export class BeaconListService {

    constructor(public http: Http) {}

    getBeaconList(userId): Observable<any> {
        return this.http.get(`https://ec2-54-67-94-166.us-west-1.compute.amazonaws.com:443/api/beacons/mybeacons/${userId}`)
            .map(data => {
                return data.json();
            })
        }


    deleteBeacon(beaconId) {
        console.log("Beacon from the service!!! ", beaconId);
        return this.http.delete(`https://ec2-54-67-94-166.us-west-1.compute.amazonaws.com:443/api/beacons/deletebeacon/${beaconId}`)
            .map(data => {
                console.log('Here is some data bweh: ', data)
            })
    }
}

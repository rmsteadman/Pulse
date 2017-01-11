import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';



@Injectable()
export class BeaconListService {

    constructor(public http: Http) {}

    getBeaconList(userId): Observable<any> {
        return this.http.get(`http://localhost:8080/api/beacons/mybeacons/${userId}`)
            .map(data => {
                return data.json();
            })
        }


    deleteBeacon(beacon) {
        console.log("Beacon from the service!!! ", beacon);
        // return this.http.delete('http://localhost:8080/api/beacons/deletebeacon', beacon)
        //     .map(data => {
        //         console.log('Here is some data bweh: ', data)
        //     })
    }
}

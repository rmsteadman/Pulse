import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';


@Injectable()
export class BeaconService {
    constructor(public http: Http, public navParams: NavParams) {}

    beaconPost(form): Observable<any> {
        let beacon = {
            title: form.title,
            details: form.details,
            position: JSON.stringify(this.navParams.get('position')),
            start: Date.now()
        }
        return this.http.post('http://localhost:8080/api/beacons/create', beacon)  
            .map(data => {
                console.log( "This is data", data.json() )
            })
    };

    getBeaconsAll() : Observable<any> {
        console.log('your best friend')
        return this.http.get('http://localhost:8080/api/beacons/allbeacons')
            .map(data => {
                return data.json();
            })
    }
}
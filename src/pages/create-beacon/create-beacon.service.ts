import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';


@Injectable()
export class BeaconService {
  constructor(public http: Http, public navParams: NavParams) {}

  beaconPost(info): Observable<any> {
    let beacon = {
      categoryType: info.categoryType,
      title: info.title,
      details: info.details,
      position: JSON.stringify(this.navParams.get('position')),
      start: Date.now()
    }
    console.log('This is pre-post Beacon:', beacon);
    return this.http.post('http://localhost:8080/api/beacons/create', beacon)
      .map(data => {
        console.log( "This is data", data.json() )
      })
  };

  getBeaconsAll() : Observable<any> {
    return this.http.get('http://localhost:8080/api/beacons/allbeacons')
      .map(data => {
        return data.json();
      })
    }

}

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Injectable()
export class BeaconService {
  constructor(public http: Http, public navParams: NavParams) {}

  beaconPost(info): Observable<any> {
    let authCred = localStorage.getItem('userId');
    let icons = {
      Active: { icon: 'http://i.imgur.com/WGBgLt7.png' },
      Art: { icon: 'http://i.imgur.com/WyH8zuQ.png' },
      Community: { icon: 'http://i.imgur.com/cKsSFbG.png' },
      Eat: { icon: 'http://i.imgur.com/kzEV39B.png' },
      Featured: { icon: 'http://i.imgur.com/VVbHJjv.png' },
      Games: { icon: 'http://i.imgur.com/bpZdExD.png' },
      Learn: { icon: 'http://i.imgur.com/4nKLb0R.png' },
      Music: { icon: 'http://i.imgur.com/dyk9hBV.png' },
      Travel: { icon: 'http://i.imgur.com/69FWA0V.png' },
      Other: { icon: 'http://i.imgur.com/RgsgSZI.png' },
      JB : { icon: 'http://i.imgur.com/twiMx0R.png' }
    }
    let beacon = {
      authCred: authCred,
      categoryType: info.categoryType,
      icon: icons[info.categoryType].icon,
      title: info.title,
      details: info.details,
      position: JSON.stringify(this.navParams.get('position')),
      start: Date.now(),
      address: info.address
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

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';


@Injectable()
export class BeaconService {
  constructor(public http: Http, public navParams: NavParams) {}

  beaconPost(info): Observable<any> {
    let icons = {
      active: { icon: 'http://i.imgur.com/WGBgLt7.png' },
      art: { icon: 'http://i.imgur.com/WyH8zuQ.png' },
      community: { icon: 'http://i.imgur.com/cKsSFbG.png' },
      eat: { icon: 'http://i.imgur.com/kzEV39B.png' },
      featured: { icon: 'http://i.imgur.com/VVbHJjv.png' },
      games: { icon: 'http://i.imgur.com/bpZdExD.png' },
      learn: { icon: 'http://i.imgur.com/4nKLb0R.png' },
      music: { icon: 'http://i.imgur.com/dyk9hBV.png' },
      travel: { icon: 'http://i.imgur.com/69FWA0V.png' },
      other: { icon: 'http://i.imgur.com/RgsgSZI.png' },
      JB : { icon: 'http://i.imgur.com/twiMx0R.png' }
    }
    let beacon = {
      categoryType: info.categoryType,
      icon: icons[info.categoryType].icon,
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

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
    let currentPosition = '';
    localStorage.getItem('currentLocation').split('').forEach(char => {
      if (char === '('){
        char = '{"lat":'
      }
      if (char === ','){
        char = ', "lng":'
      }
      if (char === ')'){
        char = '}'
      }
      currentPosition += char
    })

    let beacon = {
      authCred: authCred,
      categoryType: info.categoryType,
      icon: icons[info.categoryType].icon,
      title: info.title,
      details: info.details,
      position: currentPosition,
      start: Date.now(),
      address: info.address,
      usingCurrentLocation: info.usingCurrentLocation
    }
    
    console.log('THIS IS THE PREPOST BEACON::::: ', beacon)
    return this.http.post('http://ec2-54-67-94-166.us-west-1.compute.amazonaws.com:8080/api/beacons/create', beacon)
      .map(data => {
        console.log( "This is data", data.json() )
      })
  };

  

  getBeaconsAll() : Observable<any> {
    return this.http.get('http://ec2-54-67-94-166.us-west-1.compute.amazonaws.com:8080/api/beacons/allbeacons')
      .map(data => {
        return data.json();
      })
    }

}

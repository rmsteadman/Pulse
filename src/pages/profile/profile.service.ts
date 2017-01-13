import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';


@Injectable()
export class PreferenceService {

  constructor(public http: Http) {}

  getPreferences(): Observable<any> {
    let userId = localStorage.getItem('userId');
    return this.http.get(`https://ec2-54-67-94-166.us-west-1.compute.amazonaws.com:443/api/users/getprefs/${userId}`)
      .map(data => {
        return data.json();
      })
  }

  savePreferences(preferenceList): Observable<any> {
    let prefs = {
      updatedList: null,
      authCred: null,
    };
    prefs.updatedList = JSON.stringify(preferenceList);
    prefs.authCred = localStorage.getItem('userId');
    console.log("This is prefs: ", prefs);
    return this.http.put('https://ec2-54-67-94-166.us-west-1.compute.amazonaws.com:443/api/users/saveprefs', prefs)
      .map(data => {
        data.json();
      })
  };

}

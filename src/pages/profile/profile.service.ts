import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';


@Injectable()
export class PreferenceService {
    constructor(public http: Http) {}

    getPreferences(): Observable<any> {
        return this.http.get('http://localhost:8080/api/preferences')
            .map(data => {
                console.log(data)
            })
    }


    savePreferences(preferenceList): Observable<any> {
        let updatedList = JSON.stringify(preferenceList);
        console.log("This is the preference list: ", updatedList);
        return this.http.post('http://localhost:8080/api/preferences', updatedList)
            .map(data => {
                console.log('things are ok')
            })
    };
}
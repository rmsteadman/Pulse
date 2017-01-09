import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable'

@Injectable()
export class rsvpService {

    constructor(public http: Http) {}





    rsvpPost(info): Observable<any> {
    
    return this.http.post('http://localhost:8080/api/rsvps/create', info)
      .map(data => {
        console.log( "This is data", data.json() )
      })
    };

    

    // getBeaconsAll() : Observable<any> {
    // return this.http.get('http://localhost:8080/api/rsvps/getAll')
    //   .map(data => {
    //     return data.json();
    //   })
    // }


}

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';


@Injectable()
export class SignupService {
    constructor(public http: Http) {}

    getCurrentTime(): Observable<any> {
        return this.http.get('https://jsonplaceholder.typicode.com/users')  
            .map(data => {
                console.log( data.json() )
            })
    };

    postJSON() {

    }
}
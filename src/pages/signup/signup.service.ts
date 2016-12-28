import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable'


@Injectable()
export class SignupService {
    constructor(public http: Http) {}

    // getCurrentTime(): Observable<any> {
    //     // return this.http.get('http://date.jsontest.com')
    //     //     .map(res => res.json())
    // };

    postJSON() {

    }
}
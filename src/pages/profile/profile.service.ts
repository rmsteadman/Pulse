import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';


@Injectable()
export class SignupService {
    constructor(public http: Http) {}

    savePreferences() {
        console.log("This is working")
    };
}
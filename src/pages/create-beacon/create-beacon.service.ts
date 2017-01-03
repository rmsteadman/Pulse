import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/map';


@Injectable()
export class BeaconService {
    constructor(public http: Http) {}

    beaconPost(form): Observable<any> {
        let beacon = {
            title: form.title,
            details: form.details
        }
        return this.http.post('http://localhost:8080/api/beacon/create', beacon)  
            .map(data => {
                console.log( data.json() )
            })
    };
}
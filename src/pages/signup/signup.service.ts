import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';


@Injectable()
export class SignupService {
    constructor(public http: Http) {}

    signupPost(name): Observable<any> {
        let reqBody = {name}
        return this.http.post('http://localhost:8080/api/users/signup', reqBody)  
            .map(data => {
                console.log( data.json() )
            })
    };
}
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';


@Injectable()
export class SignupService {
    constructor(public http: Http) {}

    signupPost(form): Observable<any> {
        let user = {
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            phone: form.phone,
            password: form.password
        }
        return this.http.post('http://localhost:8080/api/users/signup', user)  
            .map(data => {
                console.log( data.json() )
            })
    };
}
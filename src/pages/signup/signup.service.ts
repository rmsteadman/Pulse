import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';


@Injectable()
export class SignUpService {
  constructor(public http: Http) {}

  signupPost(user): Observable<any> {
    let User = {
      accountId: user.accountId || 1,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      password: user.password,
      authCred: user.user_id,
      authToken: user.idToken
    }
    return this.http.post('http://localhost:8080/api/users/signup', User)
      .map(data => {
        console.log( data.json() )
      })
    };
}

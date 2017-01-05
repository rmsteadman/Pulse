import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import { AuthHttp } from 'angular2-jwt';
import { AuthService } from '../../services/auth/auth.service';
import 'rxjs/add/operator/map';


@Injectable()
export class SignUpService {
  constructor(
    public http: Http,
    public auth: AuthService
  ) {}

  public signupPost(user): Observable<any> {
    console.log('Step 2 OK');
    let User = {
      accountId: 1,
      firstName: user.user_metadata.firstName,
      lastName: user.user_metadata.lastName,
      email: user.email,
      phoneNumber: user.user_metadata.phoneNumber,
      authCred: user.user_id,
      authToken: user.idToken
    }
    console.log('Step 3 OK', User);
    return this.http.post('http://localhost:8080/api/users/signup', JSON.stringify(User))
      .map(data => {
        console.log("This is data in signup", data.json());
        return data.json();
      })
    };
}

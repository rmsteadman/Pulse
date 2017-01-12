import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable'
// import { AuthHttp } from 'angular2-jwt';
// import { AuthService } from '../../services/auth/auth.service';
import 'rxjs/add/operator/map';


@Injectable()
export class SignUpService {
  constructor(@Inject(Http)
    public http: Http
    //public auth: AuthService
  ) {}

  // gets user creds from Pulse DB
  public getUserToken() : Observable<any> {
    return this.http.get('http://ec2-54-67-94-166.us-west-1.compute.amazonaws.com:8080/api/users/gettoken')
      .map(data => {
        return data.json();
      })
  }

  // adds user creds to Pulse DB
  public signupPost(user): Observable<any> {
    // console.log('Step 2 OK, user:', user);
    // let User = {
    //   accountId: 1,
    //   firstName: user.user_metadata.firstName,
    //   lastName: user.user_metadata.lastName,
    //   email: user.email,
    //   phoneNumber: user.user_metadata.phoneNumber || null,
    //   authCred: user.user_id,
    //   authToken: user.clientID
    // }
    // console.log('Step 3 OK', this.http);
    return this.http.post('http://ec2-54-67-94-166.us-west-1.compute.amazonaws.com:8080/api/users/signup', user)
      .map(data => {
        console.log("This is data in signup", data.json());
        return data.json();
      })
    };
}

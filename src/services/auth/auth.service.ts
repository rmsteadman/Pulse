import { Storage } from '@ionic/storage';
import { AuthHttp, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Auth0Vars } from '../../auth0-variables';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

// Avoid name not found warnings
declare var Auth0: any;
declare var Auth0Lock: any;

@Injectable()
export class AuthService {

  jwtHelper: JwtHelper = new JwtHelper();
  auth0 = new Auth0({clientID: 'rzVMbwDB7CBykspP9KyiHuEe0LHVtbdE', domain: 'meteoride.auth0.com' });
  lock = new Auth0Lock('rzVMbwDB7CBykspP9KyiHuEe0LHVtbdE', 'meteoride.auth0.com', {
    auth: {
      redirect: false,
      params: {
        scope: 'openid offline_access',
      }
    },
    additionalSignUpFields: [
      {
        name: "firstName",
        placeholder: "your first name"
      },
      {
        name: "lastName",
        placeholder: "your last name"
      },
      {
        name: "phoneNumber",
        placeholder: "your phone number",
        // The following properties are optional
        validator: function(number) {
          return {
             valid: number.length === 10,
             hint: "https://example.com/assests/address_icon.png" // optional
          };
        }
      },
    ],
    theme: {
      logo: 'https://cdn4.iconfinder.com/data/icons/logos-3/400/ibeacon-logo-128.png',
      primaryColor: '#42B3F4',

    },
    languageDictionary: {
      title: "Pulse"
    },
    socialButtonStyle: 'small',
    closable: false
  });

  storage: Storage = new Storage();
  refreshSubscription: any;
  user: Object;
  zoneImpl: NgZone;
  idToken: string;

  constructor(private authHttp: AuthHttp, public http: Http, zone: NgZone) {
    this.zoneImpl = zone;
    // Check if there is a profile saved in local storage
    this.storage.get('profile').then(profile => {
      this.user = JSON.parse(profile);
    }).catch(error => {
      console.log(error);
    });

    this.storage.get('id_token').then(token => {
      this.idToken = token;
    });

    this.lock.on('authenticated', authResult => {
      this.storage.set('id_token', authResult.idToken);
      this.idToken = authResult.idToken;

      // Fetch profile information
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          // Handle error
          alert(error);
          return;
        }

        profile.user_metadata = profile.user_metadata || {};
        this.storage.set('profile', JSON.stringify(profile));
        profile.idToken = this.idToken;
        this.user = profile;
      });

      this.lock.hide();

      // save in PulseDB
      console.log('This is user', this.user);
      this.signupPost(this.user);

      this.storage.set('refresh_token', authResult.refreshToken);
      this.zoneImpl.run(() => this.user = authResult.profile);
      // Schedule a token refresh
      this.scheduleRefresh();

    });
  }

  public authenticated() {
    return tokenNotExpired('id_token', this.idToken);
  }

  public login() {
    // Show the Auth0 Lock widget
    this.lock.show();
  }

  public logout() {
    this.storage.remove('profile');
    this.storage.remove('id_token');
    this.idToken = null;
    this.storage.remove('refresh_token');
    this.zoneImpl.run(() => this.user = null);
    // Unschedule the token refresh
    this.unscheduleRefresh();
  }

  public scheduleRefresh() {
  // If the user is authenticated, use the token stream
  // provided by angular2-jwt and flatMap the token

  let source = Observable.of(this.idToken).flatMap(
    token => {
      console.log('token here', token);
      // The delay to generate in this case is the difference
      // between the expiry time and the issued at time
      let jwtIat = this.jwtHelper.decodeToken(token).iat;
      let jwtExp = this.jwtHelper.decodeToken(token).exp;
      let iat = new Date(0);
      let exp = new Date(0);

      let delay = (exp.setUTCSeconds(jwtExp) - iat.setUTCSeconds(jwtIat));

      return Observable.interval(delay);
    });

    this.refreshSubscription = source.subscribe(() => {
      this.getNewJwt();
    });
  }

  public startupTokenRefresh() {
    // If the user is authenticated, use the token stream
    // provided by angular2-jwt and flatMap the token
    if (this.authenticated()) {
      let source = Observable.of(this.idToken).flatMap(
        token => {
          // Get the expiry time to generate
          // a delay in milliseconds
          let now: number = new Date().valueOf();
          let jwtExp: number = this.jwtHelper.decodeToken(token).exp;
          let exp: Date = new Date(0);
          exp.setUTCSeconds(jwtExp);
          let delay: number = exp.valueOf() - now;

          // Use the delay in a timer to
          // run the refresh at the proper time
          return Observable.timer(delay);
        });

        // Once the delay time from above is
        // reached, get a new JWT and schedule
        // additional refreshes
        source.subscribe(() => {
          this.getNewJwt();
          this.scheduleRefresh();
        });
    }
  }

  public unscheduleRefresh() {
    // Unsubscribe fromt the refresh
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  public getNewJwt() {
    // Get a new JWT from Auth0 using the refresh token saved
    // in local storage
    this.storage.get('refresh_token').then(token => {
      this.auth0.refreshToken(token, (err, delegationRequest) => {
        if (err) {
          alert(err);
        }
        this.storage.set('id_token', delegationRequest.id_token);
        this.idToken = delegationRequest.id_token;
      });
    }).catch(error => {
      console.log(error);
    });

  }

  // Store log in credentials
  public checkUserCreds() {
    // Get a new JWT from Auth0 using the refresh token saved in local storage
    if ( this.authenticated() ) {
      console.log('Authenticated!');
    } else {
      this.storage.get('profile').then(profile => {
        profile.token = this.storage.get('id_token');
        return profile;
      }).catch(error => {
        console.log(error);
      });
    }
  }

  // get log in creds
  public getUserCreds() {
    this.storage.get('profile')
      .then(profile => {
        console.log('Step 1 OK');
        return(profile);
      })
  }

  // Custom
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

import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AuthConfig, AuthHttp } from 'angular2-jwt';
import { AuthService } from '../services/auth/auth.service';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { SignupPage } from '../pages/signup/signup';
import { CreateBeaconPage } from '../pages/create-beacon/create-beacon';
import { ProfilePage } from '../pages/profile/profile';
import { BeaconInfo } from '../modals/beacon-info/beacon-info';
import { SignUpService } from '../pages/signup/signup.service';
import { BeaconListPage } from '../pages/beacon-list/beacon-list';

let storage: Storage = new Storage();

export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({
    globalHeaders: [{'Accept': 'application/json'}],
    tokenGetter: (() => storage.get('id_token'))
  }), http);
}

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ProfilePage,
    HomePage,
    SignupPage,
    CreateBeaconPage,
    BeaconInfo,
    BeaconListPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ProfilePage,
    HomePage,
    SignupPage,
    CreateBeaconPage,
    BeaconInfo,
    BeaconListPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    },
    SignUpService
  ]
})

export class AppModule {}

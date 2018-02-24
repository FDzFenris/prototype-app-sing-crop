import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { FormsModule} from '@angular/forms';

import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { user } from '../pages/user/user';
import { CheckinPage } from '../pages/checkin/checkin';
import { ManageUserPage } from '../pages/manage-user/manage-user'

import { ToastService } from '../providers/toastService';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';



var firebaseConfig = {
  apiKey: "AIzaSyCgvjZAqZ7-EmniJmP_njA3uwX-Pg4Rafg",
    authDomain: "ionic3sing.firebaseapp.com",
    databaseURL: "https://ionic3sing.firebaseio.com",
    projectId: "ionic3sing",
    storageBucket: "ionic3sing.appspot.com",
    messagingSenderId: "434434456260"
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    user,
    CheckinPage,
    ManageUserPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),   
    AngularFireModule.initializeApp(firebaseConfig),
    FormsModule,
    AngularFireDatabaseModule,   
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    user,
    CheckinPage,
    ManageUserPage
  ],
  providers: [
    StatusBar,
    ToastService,   
    SplashScreen,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BarcodeScanner
   
  ]
})
export class AppModule {}

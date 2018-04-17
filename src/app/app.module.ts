import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { EventInfoPage} from '../pages/event-info/event-info';
import { ClassModalPage } from '../pages/class-modal/class-modal';
import { DivisionModalPage } from '../pages/division-modal/division-modal';
import { DivisionInfoPage } from '../pages/division-info/division-info';
import { ClassInfoPage } from '../pages/class-info/class-info';
import { AddRiderModalPage } from '../pages/add-rider-modal/add-rider-modal';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';

//page modules
import { ClassInfoPageModule } from '../pages/class-info/class-info.module';
import { AddRiderModalPageModule } from '../pages/add-rider-modal/add-rider-modal.module';
import { LoginPageModule } from '../pages/login/login.module';
import { SignupPageModule } from '../pages/signup/signup.module';
import { OrganizerhomePageModule } from '../pages/organizerhome/organizerhome.module';
import { CreateEventPageModule } from '../pages/create-event/create-event.module';
import { EventInfoPageModule } from '../pages/event-info/event-info.module';
import { DivisionModalPageModule } from '../pages/division-modal/division-modal.module';
import { DivisionInfoPageModule } from '../pages/division-info/division-info.module';
import { ClassModalPageModule } from '../pages/class-modal/class-modal.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
  ],
  imports: [
    BrowserModule,
    SignupPageModule,
    LoginPageModule,
    ClassModalPageModule,
    DivisionModalPageModule,
    DivisionInfoPageModule,
    CreateEventPageModule,
    EventInfoPageModule,
    AddRiderModalPageModule,
    ClassInfoPageModule,
    OrganizerhomePageModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    ClassModalPage,
    DivisionModalPage,
    AddRiderModalPage,
    ClassInfoPage,
    DivisionInfoPage,
    EventInfoPage,
    SignupPage,
    HomePage,
    ListPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider
  ]
})
export class AppModule {}

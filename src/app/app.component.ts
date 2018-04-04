import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';
import {firebaseConfig} from './firebaseCredentials';

import { AuthProvider } from '../providers/auth/auth';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { OrganizerhomePage } from '../pages/organizerhome/organizerhome'; 
import { CreateEventPage } from '../pages/create-event/create-event';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  user;
  rootPage: any;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
   public events: Events, public authProvider: AuthProvider) {
    
   /*this.pages = [
    { title: 'Default', component : HomePage},
         { title: 'DefaultList' , component: ListPage} 
         ];*/
    this.initializeApp();

    this.events.subscribe('rider login',() =>  {
      var riderRef = firebase.database().ref('Riders/' + firebase.auth().currentUser.uid);
      this.rootPage = HomePage;
      this.pages = [
      { title: 'My Events', component: HomePage},
      { title: 'Log Out', component: null}]
    });
    this.events.subscribe('organizer login',() =>  {
      var organizerRef = firebase.database().ref('Organizers/' + firebase.auth().currentUser.uid);
      this.rootPage = OrganizerhomePage;
      this.pages = [
      { title: 'Manage Events', component: OrganizerhomePage},
      { title: 'Create New Event' , component: CreateEventPage},
      { title: 'Log Out', component: null}]
    });
  }

  initializeApp() {
    firebase.initializeApp(firebaseConfig);
      const unsubscribe = firebase.auth().onAuthStateChanged( user => {
      if (!user){
        this.rootPage = LoginPage;
        unsubscribe();
      }
      this.user = user.uid;
      var riderRef = firebase.database().ref('Riders/' + user.uid);
      var organizerRef = firebase.database().ref('Organizers/' + user.uid);
      riderRef.on('value', (snap) => {
        if(snap.val() != null){
          this.rootPage = HomePage;
          this.pages = [
         { title: 'My Events', component : HomePage}, 
         { title: 'Log Out', component: null}

         ];
          unsubscribe();
        }
      });
      organizerRef.on('value', (snap) => {
        if(snap.val() != null){
          this.pages = [
         { title: 'Manage Events', component : OrganizerhomePage},
         { title: 'Create New Event' , component: CreateEventPage},
         { title: 'Log Out', component: null}
         ];
          this.rootPage = OrganizerhomePage;
          unsubscribe();
        }
      })
    });
    

  

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.component){
    this.nav.setRoot(page.component);
  }
  //logout function
  else{
    this.authProvider.logoutUser().then(() => {
    this.nav.setRoot("LoginPage");
  });
  }
  }
}

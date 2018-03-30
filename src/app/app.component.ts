import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';
import {firebaseConfig} from './firebaseCredentials';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { OrganizerhomePage } from '../pages/organizerhome/organizerhome'; 

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  user;
  rootPage: any;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    
   this.pages = [
    { title: 'Default', component : HomePage},
         { title: 'DefaultList' , component: ListPage} 
         ];
    this.initializeApp();
  }

  initializeApp() {
    firebase.initializeApp(firebaseConfig);
      const unsubscribe = firebase.auth().onAuthStateChanged( user => {
        this.user = user.uid;
      var riderRef = firebase.database().ref('Riders/' + user.uid);
      var organizerRef = firebase.database().ref('Organizers/' + user.uid);
      if (!user){
        this.rootPage = LoginPage;
        unsubscribe();
      }
      riderRef.on('value', (snap) => {
        if(snap.val() != null){
          this.rootPage = HomePage;
          this.pages = [
         { title: 'My Events', component : HomePage},
         { title: 'List' , component: ListPage} 
         ];
          unsubscribe();
        }
      });
      organizerRef.on('value', (snap) => {
        if(snap.val() != null){
          this.pages = [
         { title: 'Organizer Home', component : OrganizerhomePage},
         { title: 'List' , component: ListPage} 
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
    this.nav.setRoot(page.component);
  }
}

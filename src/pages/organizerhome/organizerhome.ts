import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import firebase from 'firebase';

import { EventInfoPage } from '../event-info/event-info';

@IonicPage()
@Component({
  selector: 'page-organizerhome',
  templateUrl: 'organizerhome.html',
})
export class OrganizerhomePage {
	eventArr = [];
	eventRef;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthProvider) {
  	this.eventRef = firebase.database().ref('Events/');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrganizerhomePage');
  }
  ionViewWillEnter(){
  	this.eventArr = [];
  	this.eventRef.on('value', (snap) => {
      snap.forEach((child) => {
        let newitem = {
          id: child.key,
          eventName: child.val().name,
          eventLocation: child.val().location,
          eventDate: child.val().date,
        }
        this.eventArr.push(newitem);
      })
  })
  	console.log(this.eventArr);
}

    logOut(){
  	this.authProvider.logoutUser().then(() => {
		this.navCtrl.setRoot("LoginPage");
	});
  }
  viewEvent(event){
  	this.navCtrl.setRoot(EventInfoPage, {
      event: event
    });
  }
}

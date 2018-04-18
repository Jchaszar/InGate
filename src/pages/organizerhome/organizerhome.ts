import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , Events} from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthProvider, public events: Events) {
  	this.eventRef = firebase.database().ref('Events/');
  }

  ionViewDidEnter(){
  	this.eventArr = [];
    //console.log(this.eventArr);
  	this.eventRef.on('value', (snap) => {
      this.eventArr = [];
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
  	//console.log(this.eventArr);
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

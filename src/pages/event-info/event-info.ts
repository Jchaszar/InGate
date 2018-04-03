import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-event-info',
  templateUrl: 'event-info.html',
})
export class EventInfoPage {
eventName;
eventDate;
eventID;
eventLocation;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillEnter() {
    this.eventName = this.navParams.get('event').eventName;
    this.eventDate = this.navParams.get('event').eventDate;
    this.eventID = this.navParams.get('event').id;
    this.eventLocation = this.navParams.get('event').eventLocation;
    console.log(this.eventName);
  }

}

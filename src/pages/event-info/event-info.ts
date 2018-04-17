import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams } from 'ionic-angular';
import firebase from 'firebase';

import { DivisionInfoPage } from '../division-info/division-info';

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
eventRef;
divisions = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
        this.eventName = this.navParams.get('event').eventName;
    this.eventDate = this.navParams.get('event').eventDate;
    this.eventID = this.navParams.get('event').id;
    this.eventLocation = this.navParams.get('event').eventLocation;
    this.eventRef = firebase.database().ref('Events/' + this.eventID);
  }

  viewDivision(division){
    this.navCtrl.setRoot(DivisionInfoPage, {
      division: division
    });
  }

  createDivision(){
  	let modal = this.modalCtrl.create('DivisionModalPage');
  	modal.present();
    modal.onDidDismiss(data => {
      if(data){
        let divisionData = data;
        this.eventRef.push({
          divisionName: divisionData.Name,
          divisionStartTime: divisionData.StartTime,
          divisionStartDate: divisionData.StartDate,
          divisionRing: divisionData.Ring
        });
      }
  this.divisions = [];
    this.eventRef.on('value', (snap) => {
      snap.forEach((child) => {
        if(child.val().divisionName == null){
          console.log(".");
        }
        else{
        let newitem = {
          parentid: snap.key,
          id: child.key,
          divisionName: child.val().divisionName,
          divisionStartTime: child.val().divisionStartTime,
          divisionStartDate: child.val().divisionStartDate,
          divisionRing: child.val().divisionRing
        }
        console.log(newitem.parentid);
        this.divisions.push(newitem);
      }
      })
    })
    })
  }

  ionViewDidLoad() {
    /*this.eventName = this.navParams.get('event').eventName;
    this.eventDate = this.navParams.get('event').eventDate;
    this.eventID = this.navParams.get('event').id;
    this.eventLocation = this.navParams.get('event').eventLocation;
    this.eventRef = firebase.database().ref('Events/' + this.eventID);
    console.log(this.eventName)*/;
  }
  ionViewWillEnter(){
    this.divisions = [];
    this.eventRef.on('value', (snap) => {
      snap.forEach((child) => {
        if(child.val().divisionName == null){
          console.log(".");
        }
        else{
        let newitem = {
          parentid: snap.key,
          id: child.key,
          divisionName: child.val().divisionName,
          divisionStartTime: child.val().divisionStartTime,
          divisionStartDate: child.val().divisionStartDate,
          divisionRing: child.val().divisionRing,
        }
        console.log(newitem.parentid);
        this.divisions.push(newitem);
      }
      })
  })
  }

}

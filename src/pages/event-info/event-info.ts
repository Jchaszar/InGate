import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams } from 'ionic-angular';
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
eventRef;
divisions = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  createDivision(){
  	let modal = this.modalCtrl.create('DivisionModalPage');
  	modal.present();
    modal.onDidDismiss(data => {
      if(data){
        let divisionData = data;
        this.eventRef.push({
          divisionName: divisionData.Name,
          divisionType: divisionData.Type
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
          id: child.key,
          divisionName: child.val().divisionName,
          divisionType: child.val().divisionType,
        }
        this.divisions.push(newitem);
      }
      })
    })
    })
  }

  ionViewDidLoad() {
    this.eventName = this.navParams.get('event').eventName;
    this.eventDate = this.navParams.get('event').eventDate;
    this.eventID = this.navParams.get('event').id;
    this.eventLocation = this.navParams.get('event').eventLocation;
    this.eventRef = firebase.database().ref('Events/' + this.eventID);
    console.log(this.eventName);
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
          id: child.key,
          divisionName: child.val().divisionName,
          divisionType: child.val().divisionType,
        }
        this.divisions.push(newitem);
      }
      })
  })
    console.log(this.divisions);
  }

}

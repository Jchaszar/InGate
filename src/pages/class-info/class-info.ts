import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ModalController} from 'ionic-angular';

import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-class-info',
  templateUrl: 'class-info.html',
})
export class ClassInfoPage {
	className;
	classDescription;
	classDelay;
	classRiders;
	classID;
	classParentID;
	classRefID;
	classRef;
  classRiderRef;
  eventID;
  riderRef;
  riders = [];
  disabledRiders = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  	this.className = this.navParams.get('class').className;
    this.classDescription = this.navParams.get('class').classDescription;
    this.classDelay = this.navParams.get('class').classDelay;
    this.classRefID = this.navParams.get('class').classRefID;
    this.classID = this.navParams.get('class').id;
    this.classParentID = this.navParams.get('class').parentid;
    this.eventID = this.navParams.get('class').eventID;
    this.riderRef = firebase.database().ref('Riders/ ')
    this.classRef = firebase.database().ref('Events/' + this.eventID +  '/' + this.classParentID + '/' + this.classID );
    this.classRiderRef = firebase.database().ref('Events/' + this.eventID + '/' + this.classParentID + '/' + this.classID + '/riders/');
    console.log(this.eventID);
    /*this.riders = [];
    this.classRiderRef.on('value', (snap) => {
      snap.forEach((child) => {
        let newRider = {
          fullName: child.val().fullName
        }
        this.riders.push(newRider);
      })
    })*/
    console.log(this.riders);
  }
  ionViewWillEnter(){
    this.riders = [];
    this.classRiderRef.on('value', (snap) => {
      snap.forEach((child) => {
        let newRider = {
          fullName: child.val().fullName
        }
        this.riders.push(newRider);
      })
    })
  }

  ionViewDidLoad() {
    
  }
  addRider(){
    this.disabledRiders = this.riders
    let modal = this.modalCtrl.create('AddRiderModalPage', {disabledRiders: this.disabledRiders});
    modal.present();
    modal.onDidDismiss(data => {
        if(data){
        console.log("pushing data");
        console.log(data);
        let riderData = data;
        riderData.forEach((snap) => {
          this.classRiderRef.push({
          fullName: snap.fullName,
          id: snap.id
        });
          this.riders = [];
          this.classRiderRef.on('value', (snap) => {
          snap.forEach((child) => {
          let newRider = {
          fullName: child.val().fullName
          }
        this.riders.push(newRider);
      })
    })
          //this.riders.push(snap);
        })

        
      }
    })
  }

}

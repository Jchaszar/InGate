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
  }
  ionViewWillEnter(){

  }

  ionViewDidLoad() {
    
  }
  addRider(){
    let modal = this.modalCtrl.create('AddRiderModalPage');
    modal.present();
    modal.onDidDismiss(data => {
      if(data){
        console.log("pushing data");
        console.log(data);
        let riderData = data;
        console.log(data.fullName);
        console.log(riderData.fullName);
        this.classRiderRef.push({
          fullName: riderData.Name,
          id: riderData.id
        });
      }
    })
  }

}

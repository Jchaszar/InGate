import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams } from 'ionic-angular';
import firebase from 'firebase';

import { ClassModalPage } from '../class-modal/class-modal';

@IonicPage()
@Component({
  selector: 'page-division-info',
  templateUrl: 'division-info.html',
})
export class DivisionInfoPage {
divisionName;
divisionType;
divisionID;
divisionParentID;
divisionRef;
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  	this.divisionName = this.navParams.get('division').divisionName;
    this.divisionType = this.navParams.get('division').divisionType;
    this.divisionID = this.navParams.get('division').id;
    this.divisionParentID = this.navParams.get('division').parentid;
    console.log(this.divisionParentID);
    console.log(this.divisionID);
    this.divisionRef = firebase.database().ref('Events/' + this.divisionParentID + this.divisionID);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DivisionInfoPage');
  }
  addClass(){
  	let modal = this.modalCtrl.create(ClassModalPage);
  	modal.present();
  }

}

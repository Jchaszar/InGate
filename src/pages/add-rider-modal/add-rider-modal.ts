import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ViewController} from 'ionic-angular';

import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-add-rider-modal',
  templateUrl: 'add-rider-modal.html',
})
export class AddRiderModalPage {
	availableRiders = [];
	classRiders = [];
	riderRef;
	selectedRider;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  	this.riderRef = firebase.database().ref('Riders/');
  	this.riderRef.on('value', (snap) => {
  		snap.forEach((child) => {
  			if(child.val().fullName == null){
  				console.log('.');
  			}
  			else{
  				let newRider = {
  					fullName : child.val().fullName,
  					id: child.val().key,
  					email : child.val().email,
  				}
  				this.availableRiders.push(newRider);
  			}
  		})
  	})
  }
  cancel(){
  	this.viewCtrl.dismiss();
 }
 save(){
 	console.log(this.classRiders);
 	this.viewCtrl.dismiss(this.classRiders);
 }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddRiderModalPage');
  }
  updateRiders(rider){
  	this.classRiders.push(rider);
  	console.log(this.classRiders);
  }

}

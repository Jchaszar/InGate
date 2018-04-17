import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ViewController} from 'ionic-angular';

import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-add-rider-modal',
  templateUrl: 'add-rider-modal.html',
})
export class AddRiderModalPage {
  staticRiders = [];
	availableRiders = [];
	classRiders = [];
	riderRef;
	selectedRider;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  	this.riderRef = firebase.database().ref('Riders/');
     this.initializeItems();
  }
  cancel(){
  	this.viewCtrl.dismiss();
 }
 save(){
 	console.log(this.classRiders);
  this.staticRiders.forEach((data) => {
      if(data.selected){
         this.classRiders.push(data);
      }
  });
 this.viewCtrl.dismiss(this.classRiders);
 }
 initializeItems(){
      this.availableRiders = [];
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
            selected: false
          }
          this.staticRiders.push(newRider);
          this.availableRiders.push(newRider);
        }
      })
    })
 }
 filterItems(ev: any){
   this.availableRiders = this.staticRiders;
   let val = ev.target.value;
   if(val && val.trim() !== ''){
     this.availableRiders = this.availableRiders.filter((item) => {
        return (item.fullName.toLowerCase().includes(val.toLowerCase()));
     });
   }
 }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddRiderModalPage');
  }
  updateRiders(rider){
  	this.staticRiders.forEach((data) => {
        if(data.id == rider.id){
          data.selected = true;
        }
    });
  	console.log(this.classRiders);
  }

}

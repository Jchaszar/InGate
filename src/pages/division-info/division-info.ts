import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams } from 'ionic-angular';
import firebase from 'firebase';

import { ClassModalPage } from '../class-modal/class-modal';
import { ClassInfoPage } from '../class-info/class-info';

@IonicPage()
@Component({
  selector: 'page-division-info',
  templateUrl: 'division-info.html',
})
export class DivisionInfoPage {
divisionName;
divisionStartTime;
divisionID;
divisionParentID;
divisionRef;
classes = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  	this.divisionName = this.navParams.get('division').divisionName;
    this.divisionStartTime = this.navParams.get('division').divisionStartTime;
    this.divisionID = this.navParams.get('division').id;
    this.divisionParentID = this.navParams.get('division').parentid;
    console.log(this.divisionParentID);
    console.log(this.divisionID);
    this.divisionRef = firebase.database().ref('Events/' + this.divisionParentID + '/' + this.divisionID);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DivisionInfoPage');
  }
  addClass(){
  	let modal = this.modalCtrl.create(ClassModalPage);

  	modal.present();
  	modal.onDidDismiss(data => {
      if(data){
      	console.log("pushing data");
        let classData = data;
        this.divisionRef.push({
          className: classData.Name,
          classDelay: classData.Delay,
          classStartTime: classData.StartTime,
          classDescription: classData.Description,
          classRefID: classData.RefID,
          eventID: this.divisionParentID,
        });
      }
    this.classes = [];
    this.divisionRef.on('value', (snap) => {
      snap.forEach((child) => {
        if(child.val().className == null){
          console.log(".");
        }
        else{
        let newitem = {
          parentid: snap.key,
          id: child.key,
          className: child.val().className,
          classDelay: child.val().classDelay,
          classStartTime: child.val().classStartTime,
          classDescription: child.val().classDescription,
          classRefID: child.val().classRefID,
          eventID: this.divisionParentID,
        }
        console.log(newitem.parentid);
        this.classes.push(newitem);
      }
      })
  })
  })
  }
  ionViewWillEnter(){
  	this.classes = [];
    this.divisionRef.on('value', (snap) => {
      snap.forEach((child) => {
        if(child.val().className == null){
          console.log(".");
        }
        else{
        let newitem = {
          parentid: snap.key,
          id: child.key,
          className: child.val().className,
          classDelay: child.val().classDelay,
          classStartTime: child.val().classStartTime,
          classDescription: child.val().classDescription,
          classRefID: child.val().classRefID,
          eventID: this.divisionParentID,
        }
        console.log(newitem.parentid);
        this.classes.push(newitem);
      }
      })
  })
  }


  viewClass(class1){
  	this.navCtrl.setRoot(ClassInfoPage, {
      class: class1
    })
  }
}

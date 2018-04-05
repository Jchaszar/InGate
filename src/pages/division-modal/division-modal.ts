import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-division-modal',
  templateUrl: 'division-modal.html',
})
export class DivisionModalPage {
	divisionName;
	divisionStartTime;
	divisionRing

	division = {Name: '' , StartTime:'', Ring: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DivisionModalPage');
  }
  cancel(){
  	this.viewCtrl.dismiss();
  }
  save(){
  	console.log(this.division.Name);
  	console.log(this.division.StartTime);
  	console.log(this.division.Ring)
  	this.viewCtrl.dismiss(this.division);
  }

}

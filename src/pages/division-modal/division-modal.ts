import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-division-modal',
  templateUrl: 'division-modal.html',
})
export class DivisionModalPage {
	divisionName;
	divisionType;

	division = {Name: '' , Type:''};

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
  	console.log(this.division.Type);
  	this.viewCtrl.dismiss(this.division);
  }

}

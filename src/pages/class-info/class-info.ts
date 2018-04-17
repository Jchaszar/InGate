import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.className = this.navParams.get('class').className;
    this.classDescription = this.navParams.get('class').classDescription;
    this.classDelay = this.navParams.get('class').classDelay;
    this.classID = this.navParams.get('class').id;
    this.classParentID = this.navParams.get('class').parentid;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassInfoPage');
  }

}

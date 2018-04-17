import { Component } from '@angular/core';
import { IonicPage, NavController,ViewController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-class-modal',
  templateUrl: 'class-modal.html',
})
export class ClassModalPage {
	className;
	classDelay;
	classDescripton;
	classRefID;

	class = {Name: '', Delay: null, Description: '', RefID: null};

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassModalPage');
  }
	cancel(){
  	this.viewCtrl.dismiss();
 	}

 	save(){
  	console.log(this.class.Name);
  	console.log(this.class.Delay);
  	console.log(this.class.Description)
  	this.viewCtrl.dismiss(this.class);
  }
}

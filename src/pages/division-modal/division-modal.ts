import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-division-modal',
  templateUrl: 'division-modal.html',
})
export class DivisionModalPage {
	division = {Name: '' , StartDate:'', StartTime:'', Ring: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public alertCtrl: AlertController) {
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
  	console.log(this.division.Ring);
    if(this.division.Name == "" || this.division.StartDate == "" || this.division.StartTime == ""|| this.division.Ring == ""){
      let alert = this.alertCtrl.create({
        title: 'Wait!',
        subTitle: 'You have not completed filling out all the required sections',
        buttons: ['Okay']
      });
      alert.present();
      return;
    }
  	this.viewCtrl.dismiss(this.division);
  }

}

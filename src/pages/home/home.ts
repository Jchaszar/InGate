import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';


export class Clss {
	private ID: string;
	private IDref: number;
	private Title: string;
	private Description: string;
	private ESTDelay: number;
	private ESTStart: number;
	private Index: number; 
	private Riders: string[];

}


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
	private event = [];
	public registeredClasses: Clss[] = [];
  constructor(public navCtrl: NavController, public authProvider: AuthProvider) {
  	this.generateTempClasses();
  }

  logOut(){
  	this.authProvider.logoutUser().then(() => {
		this.navCtrl.setRoot("LoginPage");
	});
  }
  private generateTempClasses(){
  	//Replace with relevant code
  	this.event = JSON.parse('{"Event":{"ID":"13rfs91","School":[[1522368175341,"Grand Prix Ring",[{"ID":"h4s9101s","IDref":585,"Title":"Baby Green Jumper II 2c","Description":"This is a test description","Rider":["adsfai","dkajfasd","jakdlf"],"ESTDelay":4000},{"ID":"h4s9101s","IDref":585,"Title":"Baby Green Jumper II 2c","Description":"This is a test description","Rider":["adsfai","dkajfasd"],"ESTDelay":4000},{"ID":"h4s9101s","IDref":585,"Title":"Baby Green Jumper II 2c","Description":"This is a test description","Rider":["adsfai","dkajfasd","jakdlf"],"ESTDelay":4000}]],[1522369008150,"Ring II",[{"ID":"asdfkl1","IDref":1107,"Title":"Showplace Warm Up Class O/F","Description":"This is a test description school 2","Rider":["dkajfasd","jakdlf"],"ESTDelay":4000},{"ID":"adfkj1d","IDref":100,"Title":"Low/USHJA 3\'0 Hunter O/F","Description":"This is a test description shcool 2","Rider":["adsfai","dkajfasd"],"ESTDelay":4000},{"ID":"adfwesx","IDref":120,"Title":"Non Thoroughbred Hunter O/F","Description":"This is a test description school 2","Rider":["dkajfasd","jakdlf"],"ESTDelay":4000}]]]}}');
 	//^^ Pretend that this loaded from firebase
 	//User to cross reference
 	let userID = "jakdlf";
 	//let schools = this.event.School;
 	console.log(this.event);
/* 	for(let i = 0; i < schools.length; i++){

 	}*/
  }
}

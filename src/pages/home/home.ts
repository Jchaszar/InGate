import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import firebase from 'firebase';

export class Clss {
	public ID: string;
	public IDref: number;
	public Title: string;
	public Description: string;
	public ESTStart: number;
	public Index: number; 
	public Riders: string[];
}
export class Rider{
	public ID: string;
	public Email: string;
	public Name: string =  "Defualt";
}


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
	private event = [];
	public registeredClasses: Clss[] = [];
	public currentRider: Rider = new Rider();
	private eventRef;
	private riderRef;
  constructor(public navCtrl: NavController, public authProvider: AuthProvider) {
  		this.eventRef = firebase.database().ref('Events/');
  		var user = firebase.auth().currentUser.uid;
  		this.riderRef = firebase.database().ref('Riders/' + user);
  }
  logOut(){
  	this.authProvider.logoutUser().then(() => {
		this.navCtrl.setRoot("LoginPage");
	});
  }
  ionViewWillEnter(){
  	this.riderRef.on('value', (data) => {
  		if(data.val() != null){
  			var rider = new Rider();
  			rider.ID = data.key;
  			rider.Email = data.val().email;
  			rider.Name = data.val().fullName;
  			this.currentRider = rider;
  		}
  	});  
  	console.log("called");	
  	this.eventRef.on('value', (events) => {
  		if(events.val() != null){
  		events.forEach((event) => {
  			if(event.val() != null){
  				var id = event.key;
  				console.log(id);
  				console.log(event.val().name);
  			}
  		});
  		}
  	});

  }
}

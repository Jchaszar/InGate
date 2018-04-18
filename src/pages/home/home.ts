import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import firebase from 'firebase';

export class Clazz {
	public ClassID: number;
	public ClassIDref: string;
	public ClassTitle: string;
	public ClassDescription: string;
	public ClassESTStart: number;
	public ClassIndex: number; 
	public ClassRiders: Rider[] =  [];
	//Division Info
	public DivisionIDref: string;
	public DivisionName: string;
	public DivisionRing: string;
	public DivisionStartTime: string;
	public DivisionStartDate: string;
	//Event Info
	public EventIDref: string;
	public EventDate: string;
	public EventLocation: string;
	public EventName: string;
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
	public registeredClasses: Clazz[] = [];
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
  viewClass(clazz: Clazz){

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
  	//Get the list of event ID's
  	this.eventRef.on('value', (events) => {
  		if(events.val() != null){
  			//Iterate over event ID's
  		events.forEach((event) => {
  			if(event.val() != null){
  				var eventIDref = event.key;
  				//Grab snapshot of an event ID
  				var tempRef = firebase.database().ref('Events/' + eventIDref);
  				//Event data can be accessed here on out
  				//Grab each value (we are looking for the divisions/schools)
  				tempRef.on('value', (eventData) => {
  					if(eventData.val() != null){
  						//Iterate over the values in the event
  						eventData.forEach((school) => {
  							if(school.val() != null){
  								//if the school does not have a child called division name, ignore. Not a school/division
  								if(school.val().divisionName != null){
  									var schoolIDref = school.key;
  									//Grab snapshot of the school/division
  									var schoolRef = firebase.database().ref('Events/' + eventIDref + '/' + schoolIDref);
  									//We can now access division name/ring/startdate/starttime
  									schoolRef.on('value', (schoolData) => {
  										if(schoolData != null){
  											//Iterate over each class
  											schoolData.forEach((clazz) => {
  												if(clazz.val() != null){
  													//if the value does not have a child with a key called className, then it is not a class
  													if(clazz.val().className != null){
  														var clazzIDref = clazz.key;
  														var clazzRef = firebase.database().ref('Events/' + eventIDref + '/' + schoolIDref + '/' + clazzIDref);
  														//We can now access class Description/delay/name/idref
  														clazzRef.on('value', (clazzData) => {
  															if(clazzData != null){
  																var clazzRiders = firebase.database().ref('Events/' + eventIDref + '/' + schoolIDref + '/' + clazzIDref + '/riders');
  																clazzRiders.on('value', (riders) => {
  																	if(riders != null){
  																		riders.forEach((rider) => {
  																			if(rider.val().id === this.currentRider.ID){
  																				var clazz = new Clazz();
  																				//Store Event Data in clazz
  																				clazz.EventDate = eventData.val().date;
  																				clazz.EventLocation = eventData.val().location;
  																				clazz.EventName = eventData.val().name;
  																				clazz.EventIDref = eventIDref;
  																				//Store Division Data in clazz
  																				clazz.DivisionIDref = schoolIDref;
  																				clazz.DivisionName = schoolData.val().divisionName;
  																				clazz.DivisionRing = schoolData.val().divisionRing;
  																				clazz.DivisionStartDate = schoolData.val().divisionStartDate;
  																				clazz.DivisionStartTime = schoolData.val().divisionStartTime;
  																				//Store Class Data in clazz
  																				clazz.ClassIDref = clazzIDref;
  																				clazz.ClassID = clazzData.val().classRefID;
  																				clazz.ClassTitle = clazzData.val().className;
  																				clazz.ClassDescription = clazzData.val().classDescription;
  																				clazz.ClassESTStart = clazzData.val().classDelay;
  																				riders.forEach((r) => {
  																					var newRider = new Rider();
  																					newRider.ID = r.val().id;
  																					newRider.Name = r.val().fullName;
  																					clazz.ClassRiders.push(newRider);
  																				});
  																				this.registeredClasses.push(clazz);
  																			}
  																		});
  																	}
  																});
  															}
  														});
  													}
  												}
  											});
  										}
  									});
  								}
  							}
  						});
  					}
  				});
  			}
  		});
  		}
  	});
  }
}

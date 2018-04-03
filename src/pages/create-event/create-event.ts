import { Component } from '@angular/core';
import {
  IonicPage, 
  Loading,
  LoadingController, 
  NavController,
  AlertController,
  MenuController,
  Events } from 'ionic-angular';
import firebase from 'firebase';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';



@IonicPage()
@Component({
  selector: 'page-create-event',
  templateUrl: 'create-event.html',
})
export class CreateEventPage {

riderArr = [];
eventRef;
public CreateEventForm: FormGroup;
public loading: Loading;

  constructor(public navCtrl: NavController,
  public loadingCtrl: LoadingController,
  public alertCtrl: AlertController,  
  public formBuilder: FormBuilder,
  private menuCtrl: MenuController,
  public events: Events) {
  	this.CreateEventForm = formBuilder.group({
  		eventName: [''],
  		eventLocation:['', Validators.compose([Validators.minLength(6), Validators.required])],
  		eventDate:['']
  	});
  	this.eventRef = firebase.database().ref('Events/');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateEventPage');
  }

  ionViewWillEnter(){

  	/*this.riderArr = [];
    this.riderRef.on('value', (snap) => {
      snap.forEach((child) => {
        let newitem = {
          id: child.key,
          email: child.val().email,
          fullName: child.val().fullName,
        }
        this.riderArr.push(newitem);
      })
    })*/
  }

  createEvent(){
  	if(!this.CreateEventForm.valid){
  		console.log(this.CreateEventForm)
  	}
  	else{
  		this.eventRef.push({
  			name: this.CreateEventForm.value.eventName,
  			location: this.CreateEventForm.value.eventLocation,
  			date: this.CreateEventForm.value.eventDate
  		})
  		this.navCtrl.setRoot('OrganizerhomePage');
  	}
  }

}

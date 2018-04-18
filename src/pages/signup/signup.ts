import { Component } from '@angular/core';
import { IonicPage, 
  NavController, 
  Loading,
  LoadingController,
  AlertController,
  MenuController,
  Events } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';
import { HomePage } from '../home/home';
import  firebase from 'firebase'; 


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
	public signupForm: FormGroup;
	public loading: Loading;
	organizerRef;
	riderRef;
  constructor(public navCtrl: NavController, 
    public authProvider: AuthProvider,
    public formBuilder: FormBuilder, 
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private menuCtrl: MenuController,
    public events: Events)
     {
     	this.organizerRef = firebase.database().ref('Organizers/');
     	this.riderRef = firebase.database().ref('Riders/');

      this.signupForm = formBuilder.group({
      	firstName: ['', Validators.compose([Validators.minLength(1),Validators.required])],
        lastName: ['',Validators.compose([Validators.minLength(1),Validators.required])],
        email: ['', 
          Validators.compose([Validators.required, EmailValidator.isValid])],
        password: ['', 
          Validators.compose([Validators.minLength(6), Validators.required])],
        userType:['rider']
      });	
  }
  ionViewWillEnter(){
  	this.menuCtrl.swipeEnable(false);
  }
  ionViewWillLeave(){
  	this.menuCtrl.swipeEnable(true);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }
  signupUser(){
  	if (!this.signupForm.valid){
    console.log(this.signupForm.value);
    //sign up for riders
  } else if(this.signupForm.value.userType == "rider") {
    this.authProvider.signupRider(this.signupForm.value.email, 
      this.signupForm.value.password, this.signupForm.value.firstName + " " + this.signupForm.value.lastName)
    .then(() => {
      this.loading.dismiss().then( () => {
      	this.events.publish('rider login');
        this.navCtrl.setRoot(HomePage);
      });
    }, (error) => {
      this.loading.dismiss().then( () => {
        let alert = this.alertCtrl.create({
          message: error.message,
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        alert.present();
      });
    });
    this.loading = this.loadingCtrl.create();
    this.loading.present();
  }
  //sign up for organizer
  else if(this.signupForm.value.userType == "organizer") {
    this.authProvider.signupOrganizer(this.signupForm.value.email, 
      this.signupForm.value.password, this.signupForm.value.firstName + " " + this.signupForm.value.lastName)
    .then(() => {
      this.loading.dismiss().then( () => {
      	this.events.publish('organizer login');
        this.navCtrl.setRoot('OrganizerhomePage');
      });
    }, (error) => {
      this.loading.dismiss().then( () => {
        let alert = this.alertCtrl.create({
          message: error.message,
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        alert.present();
      });
    });
    this.loading = this.loadingCtrl.create();
    this.loading.present();
  }

}

}
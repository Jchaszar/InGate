import { Component } from '@angular/core';
import {
  IonicPage, 
  Loading,
  LoadingController, 
  NavController,
  AlertController,
  MenuController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { OrganizerhomePage } from '../organizerhome/organizerhome';
import firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
	public loginForm: FormGroup;
	public loading: Loading;

  constructor(public navCtrl: NavController,
  public loadingCtrl: LoadingController,
  public alertCtrl: AlertController, 
  public authProvider: AuthProvider, 
  public formBuilder: FormBuilder,
  private menuCtrl: MenuController) {
  	this.loginForm = formBuilder.group({
  		email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
  		password:['', Validators.compose([Validators.minLength(6), Validators.required])]
  	});
  }
  ionViewWillEnter(){
  	this.menuCtrl.swipeEnable(false);
  }
  ionViewWillLeave(){
  	this.menuCtrl.swipeEnable(true);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  //method that logs in user through firebase authentication
  loginUser(){
  	if(!this.loginForm.valid){
  		console.log(this.loginForm.value);
  	} else {
  		this.authProvider.loginUser(this.loginForm.value.email, this.loginForm.value.password)
  		.then(authData => {
  			var user = firebase.auth().currentUser.uid;
  			var riderRef = firebase.database().ref('Riders/' + user);
  			var organizerRef = firebase.database().ref('Organizers/' + user);
  			//checks for rider snapshot, if true navigates to riderHome page
  			riderRef.on('value', (snap) => {
  				if(snap.val() != null){
  				this.loading.dismiss().then(() => {
  					this.navCtrl.setRoot(HomePage);
  				})
  			}
  			});
  			//checks for organizer snapshot, if true navigates to organizerhomepage
  			organizerRef.on('value', (snap) => {
  				if(snap.val() != null){
  				this.loading.dismiss().then(() => {
  					this.navCtrl.setRoot(OrganizerhomePage);
  				})
  			}
  			});
  			
  		}, error => {
  			this.loading.dismiss().then(() => {
  				let alert = this.alertCtrl.create({
  					message: error.message,
  					buttons: [
  						{
  							text: "Ok",
  							role:'cancel'
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
  //method to navigate to sign up page
  goToSignup(): void {
  	this.navCtrl.push('SignupPage');
  }
  //method to navigate to reset password page
  goToResetPassword(): void{
  	this.navCtrl.push('ResetPasswordPage');
  }

}

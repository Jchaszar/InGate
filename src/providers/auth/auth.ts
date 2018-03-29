import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class AuthProvider {

  constructor() {
    
  }
  loginUser(email: string, password: string): Promise<any> {
  	return firebase.auth().signInWithEmailAndPassword(email,password);
  }
  signupRider(email: string, password: string): Promise<any>{
  	return firebase.auth().createUserWithEmailAndPassword(email,password).then( newUser => {
  		firebase.database().ref('/Riders').child(newUser.uid).set({ email: email});
  	});
  }
  signupOrganizer(email: string, password: string): Promise<any>{
  	return firebase.auth().createUserWithEmailAndPassword(email,password).then( newUser => {
  		firebase.database().ref('/Organizers').child(newUser.uid).set({ email: email});
  	});
  }
  resetPassword(email: string): Promise<void>{
  	return firebase.auth().sendPasswordResetEmail(email);
  }
  logoutUser(): Promise<void>{
  	return firebase.auth().signOut();
  }


}

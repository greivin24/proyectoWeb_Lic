import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


// Firebase
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';


// Initialize Firebase
var config = {
  apiKey: "AIzaSyALBVTT556hh7Jg1sCdA6eOE4G4zNyBxeA",
  authDomain: "angular-crud-firebase-d60e1.firebaseapp.com",
  databaseURL: "https://angular-crud-firebase-d60e1.firebaseio.com",
  projectId: "angular-crud-firebase-d60e1",
  storageBucket: "angular-crud-firebase-d60e1.appspot.com",
  messagingSenderId: "151666909009"
};

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule
  ], 
  exports:[
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule
  ],
  providers: [
  ],
})
export class FirebaseModule { }

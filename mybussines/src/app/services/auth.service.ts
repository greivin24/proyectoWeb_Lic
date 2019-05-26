import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { Router } from '@angular/router';

import { UserAuth } from '../interfaces/interface';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //AUTH
  user$: Observable<UserAuth>;

  constructor(private angularFireAuth:AngularFireAuth, private angularFirestore:AngularFirestore, private router:Router) { 
    this.user$ = this.angularFireAuth.authState.pipe(
      switchMap(user =>{
        if(user){
          return this.angularFirestore.doc<UserAuth>(`users/${user.uid}`).valueChanges();
        }else{
          return of(null);
        }
      })
    );
  }

  async googleSingIn(){
    const provider = new auth.GoogleAuthProvider();
    const credencial = await this.angularFireAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credencial.user);
  }

  async facebookSingIn(){
    const provider = new auth.FacebookAuthProvider();
    const credencial = await this.angularFireAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credencial.user); 
  }

  async loginEmailPass(email: string, password: string) {
    const credencial = await this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
    return this.updateUserData(credencial.user);
}

  async signOut(){
    await this.angularFireAuth.auth.signOut();
    return this.router.navigate(['/']);
  }

  updateUserData(user){
      const userRef: AngularFirestoreDocument<UserAuth> = this.angularFirestore.doc(`users/${user.uid}`);
      const data = {
        uid:  user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        rol: "Editor"
      } 
       return userRef.set(data, {merge: true});
  }


}





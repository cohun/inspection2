import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Subject } from "rxjs/Subject";
import { AngularFireAuth } from "@angular/fire/auth";

import { AuthData } from "./auth-data";
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserUid } from '../_interface/userUid';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new Subject<boolean>();
  authUser = new Subject<string>();
  private isAuthenticated = false;
  us$: Observable<UserUid[]>;
  id: string;

  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              private db: AngularFirestore) { }

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/home']);
        this.getUserName(user.uid);
        this.id = user.uid;

        this.us$.subscribe(us => us.forEach(val => {
          this.authUser.next(val.user);
        }))
      } else {
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
      }
    });
  }
  registerUser(authData: AuthData) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
      })
      .catch(error => {
        console.log(error);
      });
  }
  login(authData: AuthData) {
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }
  getUserName(id: string) {
    this.us$ = this.db.collection('users', ref => ref.where('uid', 'array-contains', id))
    .snapshotChanges().pipe(map(dat => {
      return dat.map(x => {
        return {
          ...x.payload.doc.data() as UserUid
      }})
    }))
  }
}

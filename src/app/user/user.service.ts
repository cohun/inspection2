import { Injectable } from '@angular/core';
import {
  AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription, pipe } from 'rxjs';
import { UserSite } from '../_interface/user-site';
import { map, tap, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  sites$: Observable<UserSite[]>;
  si$: Subscription
  operators$: Observable<UserSite[]>;

  constructor(private db: AngularFirestore) { }

  getSites(user: string) {
  this.sites$ = this.db.collection('users', ref => ref.where('user', '==', user)).snapshotChanges()
  .pipe(map(snaps => {
    return snaps.map(snap => {
      return {
        ...snap.payload.doc.data()
      }as UserSite;
    });
    }));
  }
}

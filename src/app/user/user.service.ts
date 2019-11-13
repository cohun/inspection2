import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription, pipe } from 'rxjs';
import { UserSite } from '../_interface/user-site';
import { map, tap, first } from 'rxjs/operators';
import { firestore } from 'firebase';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  sites$: Observable<UserSite[]>;
  si$: Subscription;
  operators$: Observable<UserSite[]>;

  constructor(private db: AngularFirestore) { }

  getSites(user: string) {
  this.sites$ = this.db.collection('users', ref => ref.where('user', '==', user)).snapshotChanges()
  .pipe(map(snaps => {
    return snaps.map(snap => {
      return {
        id: snap.payload.doc.id,
        ...snap.payload.doc.data()
      }as UserSite;
    });
    }));
  }
  addSites(id:string, user: string, newSite) {
    console.log(id, user, newSite);

    this.db.collection('users')
    .doc(id).update({
      ['sites']: firebase.firestore.FieldValue.arrayUnion(newSite)
    });
    alert('Sikeres adatbevitel...')
}
addOperators(id:string, user: string, newOperator) {
  console.log(id, user, newOperator);

  this.db.collection('users')
  .doc(id).update({
    ['operators']: firebase.firestore.FieldValue.arrayUnion(newOperator)
  });
  alert('Sikeres adatbevitel...')
}

}

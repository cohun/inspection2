import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { UserSite } from '../_interface/user-site';
import { map, tap, first } from 'rxjs/operators';
import { firestore } from 'firebase';
import * as firebase from 'firebase/app';
import { Product } from '../_interface/product';
import { Productgysz } from '../_interface/product-gysz';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  sites$: Observable<UserSite[]>;
  si$: Subscription;
  operators$: Observable<UserSite[]>;
  public product$: Observable<Productgysz[]>;
  le: number;
  products$: Observable<Product[]>;

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

checkid(id: string, user: string) {
  this.db.collection('specProduct', ref => ref.where('id', '==', id)
                                              .where('user', '==', user))
  .valueChanges()
  .forEach(element => {
      this.le = (element.length);
  }), first();
}
addOperantee(user: string, gysz: string, site: string, fid: string, prod: Product) {
  this.db.collection('operantee').add({user, gysz, site, fid, ...prod});
  this.product$ = this.db.collection('operantee', ref => ref.where('user', '==', user))
  .snapshotChanges().pipe(
    map(snaps => {
      return snaps.map(snap => {
        return {
      ...snap.payload.doc.data()}as Productgysz;
    })
  })
  )
}
getOpperantee(user: string) {
  this.product$ = this.db.collection('operantee', ref => ref.where('user', '==', user))
  .snapshotChanges().pipe(
    map(snaps => {
      return snaps.map(snap => {
        return {
      ...snap.payload.doc.data()}as Productgysz;
    })
  })
  )
}
delOperantee(gysz, user) {
 const doc = this.db.collection('operantee', ref => ref.where('gysz', '==', gysz));
 const doc$ = doc.snapshotChanges().pipe(map(snaps => snaps.map(snap => {
  return snap.payload.doc.id; })));
  const sub = doc$.subscribe(value => {
    if (value.length > 0) {
      value.forEach(x => {
        console.log('from specProduct', x);

        this.db.collection('operantee').doc(x).delete();
    });
  }
    sub.unsubscribe();
  });
  this.getOpperantee(user);

  }

  getProducts(group: string) {
    this.products$ = this.db.collection('products', ref => ref.where('group', '==', group))
    .snapshotChanges()
    .pipe(map(snaps => {
      return snaps.map(snap => {
        return {
          ...snap.payload.doc.data()
        }as Product
      })
    }))
  }
}

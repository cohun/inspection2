import { Injectable, OnDestroy } from '@angular/core';
import { Record } from "./../_interface/record.model";
import { RecordCreation } from "./../_interface/record-creation";
import { User } from "../_interface/user";
import { UserUid } from '../_interface/userUid';
import { Observable } from 'rxjs';
import { map, merge, first, tap, take, subscribeOn, takeWhile } from "rxjs/operators";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
 } from '@angular/fire/firestore';
import { SpecProduct } from "../_interface/specProduct";
import { Product } from "../_interface/product";
import { firestore } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  public records: Record[];
  records$: Observable<Record[]>;
  public recUpdate$: Observable<Record[]>;
  public fid: string;
  public user$: Observable<User[]>;
  public users$: Observable<User[]>;
  public us$: Observable<UserUid[]>;
  user = [];
  public ide: string;
  gyszCollection: AngularFirestoreCollection<SpecProduct>;
  productDoc: AngularFirestoreDocument<Product>;
  public productId = [];
  public type = [];
  public length = [];
  public descreption = [];
  private di: string;
  private f: string;

  constructor(private db: AngularFirestore) { }

  getUserName(id: string) {
    this.us$ = this.db.collection('users', ref => ref.where('uid', 'array-contains', id))
    .snapshotChanges().pipe(map(dat => {
      return dat.map(x => {
        return {
          ...x.payload.doc.data() as UserUid
      };
    });
    }));
    console.log(this.us$);
  }
  getRecords(data) {
    return this.db.collection('records').valueChanges()
      .subscribe(dat => data.data = dat);
  }
  getUserRecords(data, id) {
    console.log('id:', id);

    return this.db.collection('records', ref => ref.where('user', '==', id)).valueChanges()
      .subscribe(dat => data.data = dat);
  }
  addRecords(rec) {
    this.db.collection('records').add(rec);
  }
  upRecords(id, rec) {
    this.db.collection('records').doc(id).update(rec);
  }
  delRecords(id) {
    this.db.collection('records').doc(id).delete();
  }
  addUsers(use) {
    this.db.collection('users').add(use);
  }

  getUser(ide: string) {
    this.user$ = this.db.collection('users', ref => ref.where('user', '==', ide)).snapshotChanges()
    .pipe(map(snaps => {
      return snaps.map(snap => {
        return {
          ...snap.payload.doc.data() as object
        }as User;
      });
     }));
  }

  getToUpdate(ide, user) {

    this.recUpdate$ = this.db.collection('records', ref => ref.where('id', '==', ide)
                                                              .where('user', '==', user))
    .snapshotChanges()
    .pipe(map(snaps => {
      return snaps.map(snap => {
        return {
          fid: snap.payload.doc.id,
          ...snap.payload.doc.data() as object
        }as Record;
      });
     }));
  }

  getUserToAutocomplete() {
    this.users$ = this.db.collection('users').snapshotChanges()
   .pipe(map(data => {
     return data.map(e => {
       return {
         ...e.payload.doc.data() as object
       } as User;
     });
   }));
  }

    loadAll() {
      this.records$ = this.db.collection('records').snapshotChanges()
      .pipe(map(snaps => {
        return snaps.map(snap => {
          return {
            fid: snap.payload.doc.id,
            ...snap.payload.doc.data() as object
          }as Record;
        });
       }));
    }

    findProductId(gyszArray) {
      this.productId = [];
      for (const gy of gyszArray) {
        this.gyszCollection = this.db.collection('specProduct', ref => ref.where('id', '==', gy));
        this.gyszCollection.valueChanges().subscribe(x => x.forEach(y => this.productId.push(y.fid)));
      }
    }
    getProduct(fid) {
      this.type = [];
      this.length = [];
      this.descreption = [];
      this.productDoc = this.db.doc(`products/${fid}`);
      this.productDoc.valueChanges().subscribe(x => {
        this.type.push(x.type);
        this.length.push(x.length);
        this.descreption.push(x.descreption);
       });
    }
    // update
  updateIdInRemarks(idOld, idNew) {
    const doc = this.db.collection('remarks', ref => ref.where('id', '==', idOld));
    const doc$ = doc.snapshotChanges().pipe(map(snaps => snaps.map(snap => {
      return snap.payload.doc.id; })));
    const sub = doc$.subscribe(value => {
      if (value.length > 0) {
        value.forEach(x => {
          console.log(x);
          this.db.collection('remarks').doc(x).update({id: idNew});
        });
      }
      sub.unsubscribe();
    });
  }

  updateSpecProduct(actOld: string, actNew: string, dateOld: string, dateNew: string, idOld: string, idNew: string, userOld: string, userNew: string) {
    console.log(actOld);

    const doc = this.db.collection('specProduct', ref => ref.where('user', '==', userOld)
                                                  .where(actOld, 'array-contains', idOld));
    const doc$ = doc.snapshotChanges().pipe(map(snaps => snaps.map(snap => {
      return snap.payload.doc.id; })));
    const sub = doc$.pipe(takeWhile(val => val.length > 0)).subscribe(value => {
      if (value.length > 0) {
        value.forEach(x => {
          console.log('from specProduct', x, actOld, actNew, idOld, idNew, dateOld, dateNew);
          console.log(actOld, idOld);
          this.db.collection('specProduct').doc(x)
       .update(
         {[actOld]: firestore.FieldValue.arrayRemove(idOld, dateOld)}
       );
       console.log(actOld, idOld);
       console.log(actNew, idNew, dateNew);

/*        this.db.collection('specProduct').doc(x)
       .update(
         {[actOld]: firestore.FieldValue.arrayRemove(dateOld)}
       );
 */
       this.db.collection('specProduct').doc(x)
        .update(
          {[actNew]: firestore.FieldValue.arrayUnion(idNew)}
        );
        this.db.collection('specProduct').doc(x)
        .update(
          {[actNew]: firestore.FieldValue.arrayUnion(dateNew)}
        );

          this.db.collection('specProduct').doc(x).update({user: userNew});

        });
      }
      setTimeout(() => {
        sub.unsubscribe();
      }, 100);

    });
  }

  deleteRec(fid, id, user, action, dateOfAction) {
    // deleting records with the help of fid
    this.db.collection('records').doc(fid).delete();

    // deleting specProduct with the help of user and id
    const doc = this.db.collection('specProduct', ref => ref.where('user', '==', user)
                                                  .where(action, 'array-contains', id));
    const doc$ = doc.snapshotChanges().pipe(map(snaps => snaps.map(snap => {
      return snap.payload.doc.id; })));
    const sub = doc$.subscribe(value => {
      if (value.length > 0) {
        value.forEach(x => {
          console.log('from specProduct', x);

          this.db.collection('specProduct').doc(x)
       .update(
         {[action]: firestore.FieldValue.arrayRemove(id, dateOfAction)}
       );
      });
    }
      sub.unsubscribe();
    });

    // deleting remarks with the help of id
    const dock = this.db.collection('remarks', ref => ref.where('id', '==', id));
    const do$ = dock.snapshotChanges().pipe(map(snapsr => snapsr.map(snapr => {
      return snapr.payload.doc.id; })));
    const su = doc$.subscribe(value => {
      if (value.length > 0) {
        value.forEach(xr => {
          console.log('from remarks', xr);

          this.db.collection('remarks').doc(xr).delete();
      });
    }
      su.unsubscribe();
    });
  }

  }

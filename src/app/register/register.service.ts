import { Injectable, OnDestroy } from '@angular/core';
import { Record } from "./../_interface/record.model";
import { RecordCreation } from "./../_interface/record-creation";
import { User } from "../_interface/user";
import { Observable } from 'rxjs';
import { map, merge, first } from "rxjs/operators";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
 } from '@angular/fire/firestore';
import { SpecProduct } from "../_interface/specProduct";
import { Product } from "../_interface/product";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  public records: Record[];
  records$: Observable<Record[]>;
  public recUpdate$: Observable<RecordCreation[]>;
  public fid: string;
  public user$: Observable<User[]>;
  public users$: Observable<User[]>;
  user = [];
  public ide: string;
  gyszCollection: AngularFirestoreCollection<SpecProduct>;
  productDoc: AngularFirestoreDocument<Product>;
  public productId = [];
  public type = [];
  public length = [];
  public descreption = [];

  constructor(private db: AngularFirestore) { }

  getRecords(data) {
    return this.db.collection('records').valueChanges()
      .subscribe(dat => data.data = dat);
  }
  addRecords(rec) {
    this.db.collection('records').add(rec);
  }

  addUsers(use) {
    this.db.collection('users').add(use);
  }

  getUser(ide) {
    this.user$ = this.db.collection('users', ref => ref.where('user', '==', ide)).snapshotChanges()
    .pipe(map(snaps => {
      return snaps.map(snap => {
        return {
          ...snap.payload.doc.data()
        }as User;
      });
     }));
  }

  getToUpdate(ide) {
    this.recUpdate$ = this.db.collection('records', ref => ref.where('id', '==', ide)).snapshotChanges()
    .pipe(map(snaps => {
      return snaps.map(snap => {
        return {
          ...snap.payload.doc.data()
        }as RecordCreation;
      });
     }));
  }

  getUserToAutocomplete() {
    this.users$ = this.db.collection('users').snapshotChanges()
   .pipe(map(data => {
     return data.map(e => {
       return {
         ...e.payload.doc.data()
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
            ...snap.payload.doc.data()
          }as Record;
        });
       }));
    }

    findProductId(gyszArray) {
      for (const gy of gyszArray) {
        this.gyszCollection = this.db.collection('specProduct', ref => ref.where('id', '==', gy));
        this.gyszCollection.valueChanges().subscribe(x => x.forEach(y => this.productId.push(y.fid)));
      }
    }
    getProduct(fid) {
      this.productDoc = this.db.doc(`products/${fid}`);
      this.productDoc.valueChanges().subscribe(x => {
        this.type.push(x.type);
        this.length.push(x.length);
        this.descreption.push(x.descreption);
       });
    }
  }

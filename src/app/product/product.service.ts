import { Injectable } from '@angular/core';
import { RecordCreation } from "../_interface/record-creation";
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public record$: Observable<RecordCreation[]>;

  constructor(private db: AngularFirestore) { }

  getRecord(user) {
    this.record$ = this.db.collection('records', ref => ref.where('user', '==', user)).snapshotChanges()
    .pipe(map(snaps => {
      return snaps.map(snap => {
        return {
          ...snap.payload.doc.data()
        }as RecordCreation;
      });
     }));
  }

  getProducts(data, group) {
    return this.db.collection('products', ref => ref.where('group', '==', group)).valueChanges()
      .subscribe(dat => data.data = dat);
  }


}

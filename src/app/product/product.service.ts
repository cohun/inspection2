import { Injectable } from '@angular/core';
import { RecordCreation } from "../_interface/record-creation";
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { AngularFirestore } from '@angular/fire/firestore';
import { ProductFid } from "../_interface/product-fid";
import { SpecProduct } from "../_interface/specProduct";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public record$: Observable<RecordCreation[]>;
  public product$: Observable<ProductFid[]>;
  public specProduct$: Observable<SpecProduct[]>;

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

  getFid(type, length, descreption, capacity, manufacturer) {
    this.product$ = this.db.collection('products', ref => ref.where('type', '==', type)
                                                     .where('length', '==', length)
                                                     .where('descreption', '==', descreption)
                                                     .where('capacity', '==', capacity)
                                                     .where('manufacturer', '==', manufacturer))
    .snapshotChanges()
    .pipe(map(snaps => {
      return snaps.map(snap => {
        return {
          fid: snap.payload.doc.id,
          ...snap.payload.doc.data()
        }as ProductFid;
      });
     }));
  }

  loadProdSpec(fid, user) {
    this.specProduct$ = this.db.collection('specProduct', ref => ref.where('fid', '==', fid)
                                                            .where('user', '==', user ))
    .snapshotChanges()
    .pipe(map(snaps => {
      return snaps.map(snap => {
        return {
          ...snap.payload.doc.data()
        }as SpecProduct;
      });
     }));
  }


}

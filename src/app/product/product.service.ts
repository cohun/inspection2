import { Injectable } from '@angular/core';
import { RecordCreation } from "../_interface/record-creation";
import { Observable } from 'rxjs';
import { map, take, first } from "rxjs/operators";
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';
import { ProductFid } from "../_interface/product-fid";
import { SpecProduct } from "../_interface/specProduct";
import { Product } from '../_interface/product';
import { Fid } from "../_interface/fid";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public record$: Observable<RecordCreation[]>;
  public rec$: Observable<RecordCreation[]>;
  public product$: Observable<ProductFid[]>;
  public specProduct$: Observable<SpecProduct[]>;
  public productGroup$: Observable<Product[]>;
  public length: number;

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

  getRec(id) {
    this.rec$ = this.db.collection('records', ref => ref.where('id', '==', id)).snapshotChanges()
    .pipe(map(snaps => {
      return snaps.map(snap => {
        return {
          ...snap.payload.doc.data()
        }as RecordCreation;
      });
     }));
  }

  updateAction(id, act, srsz, date) {
    console.log(id);

    this.db.collection('specProduct', ref => ref.where('id', '==', id))
     .snapshotChanges()
     .subscribe(snaps => {
       const fi = snaps.map(snap => snap.payload.doc.id);
       const f = fi[0];
       console.log(f);
       this.db.collection('specProduct').doc(f)
       .update(
         {[act]: firestore.FieldValue.arrayUnion(srsz, date)}
       );
     }
     );
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

  checkDupl(type, length, descreption, capacity, manufacturer) {
    this.db.collection('products', ref => ref.where('type', '==', type)
                                                     .where('length', '==', length)
                                                     .where('descreption', '==', descreption)
                                                     .where('capacity', '==', capacity)
                                                     .where('manufacturer', '==', manufacturer))
    .valueChanges()
    .forEach(element => {
        this.le(element.length);
    }), first();

  }

  checkid(id) {
    this.db.collection('specProduct', ref => ref.where('id', '==', id))
    .valueChanges()
    .forEach(element => {
        this.le(element.length);
    }), first();
  }

  le(length) {
      this.length = length;
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

  loadProdGroup(group) {
    this.productGroup$ = this.db.collection('products', ref => ref.where('group', '==', group))
    .snapshotChanges()
    .pipe(map(snaps => {
      return snaps.map(snap => {
        return {
          ...snap.payload.doc.data()
        }as Product;
    });
  }));
}
addProduct(prod) {
  this.db.collection('products').add(prod);
}
addSpecProd(prod) {
  this.db.collection('specProduct').add(prod);
}
certiAct(id) {
  return this.db.collection('specProduct', ref => ref.where('id', '==', id))
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

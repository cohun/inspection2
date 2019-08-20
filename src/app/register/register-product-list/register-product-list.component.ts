import { Component, OnInit, OnDestroy, DoCheck, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Observable, Subscription } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
 } from '@angular/fire/firestore';
import { SpecProdCreation } from "../../_interface/specProd-creation";
import { Remark } from "../../_interface/remark";
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-register-product-list',
  templateUrl: './register-product-list.component.html',
  styleUrls: ['./register-product-list.component.css']
})
export class RegisterProductListComponent implements OnInit {
  public srsz: string;
  public user: string;

  constructor(
    private activeRoute: ActivatedRoute, private afs: AngularFirestore
  ) { }

  specCollection: AngularFirestoreCollection<SpecProdCreation>;
  remCollection: AngularFirestoreCollection<Remark>;
  specDocument: AngularFirestoreDocument<SpecProdCreation>;
  specObservable: Observable<SpecProdCreation[]>;
  remObservable: Observable<Remark[]>;

  ngOnInit() {
    this.srsz = this.activeRoute.snapshot.queryParams.id;
    this.user = this.activeRoute.snapshot.queryParams.user;

    this.remCollection = this.afs.collection('remarks', ref => ref.where('id', '==', this.srsz));
    this.remObservable = this.remCollection.snapshotChanges().pipe(map(arr => {
      return arr.map(snap => {
        const data = snap.payload.doc.data();
        return { ...data };
      });
    }));
}
}

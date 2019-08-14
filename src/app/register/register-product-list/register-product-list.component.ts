import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Observable, Subscription } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
 } from '@angular/fire/firestore';
 import { SpecProdCreation } from "../../_interface/specProd-creation";
 import { Remark } from "../../_interface/remark";


@Component({
  selector: 'app-register-product-list',
  templateUrl: './register-product-list.component.html',
  styleUrls: ['./register-product-list.component.css']
})
export class RegisterProductListComponent implements OnInit, OnDestroy {
  public srsz: string;
  public user: string;
  public gysz:[string];

  constructor(
    private activeRoute: ActivatedRoute, private afs: AngularFirestore
  ) { }

  specCollection: AngularFirestoreCollection<SpecProdCreation>;
  remCollection: AngularFirestoreCollection<Remark>;
  specDocument: AngularFirestoreDocument<SpecProdCreation>;
  specObservable: Observable<SpecProdCreation[]>;
  remObservable: Observable<Remark[]>;
  sub: Subscription;

  ngOnInit() {
    this.srsz = this.activeRoute.snapshot.queryParams.id;
    this.user = this.activeRoute.snapshot.queryParams.user;

    this.remCollection = this.afs.collection('remarks', ref => ref.where('id', '==', this.srsz));
    this.remObservable = this.remCollection.valueChanges();
    this.sub = this.remObservable.subscribe(x => {
      x.forEach(y => this.gysz.push(y.fid))});
    console.log(this.gysz.forEach(x => x[0]));
    console.log(this.gysz);


    this.specCollection = this.afs.collection('specProduct', ref => ref.where('user', '==', this.user))
    this.specObservable = this.specCollection.valueChanges();


}

ngOnDestroy() {
  this.sub.unsubscribe()
}
}

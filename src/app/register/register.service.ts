import { Injectable } from '@angular/core';
import { Record } from "./../_interface/record.model";
import { User } from "../_interface/user";
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  public records: Record[];
  records$: Observable<Record[]>;
  public fid: string;
  public user$: Observable<User[]>;

  constructor(private db: AngularFirestore) { }

  getRecords(data) {
    return this.db.collection('records').valueChanges()
      .subscribe(dat => data.data = dat);
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

}

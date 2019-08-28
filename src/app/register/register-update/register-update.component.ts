import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegisterService } from '../register.service';
import { Observable } from 'rxjs';
import { RecordCreation } from 'src/app/_interface/record-creation';
import { Record } from "../../_interface/record.model";
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-register-update',
  templateUrl: './register-update.component.html',
  styleUrls: ['./register-update.component.css']
})
export class RegisterUpdateComponent implements OnInit {
  public record: Observable<Record[]>;
  public recordForm: FormGroup;
  public idOld: string;
  public fid: string;

  constructor(
    private activeRoute: ActivatedRoute,
    private register: RegisterService,
    private location: Location
  ) { }

  ngOnInit() {
    const ide: string = this.activeRoute.snapshot.queryParams.id;
    const user: string = this.activeRoute.snapshot.queryParams.user;
    this.idOld = ide;

    // get the id of the register of idOld
    this.register.getIdRec(this.idOld).pipe(map(x => x.forEach(x => {this.fid = x.fid})));


    this.register.getToUpdate(ide, user);
    this.record = this.register.recUpdate$;
    setTimeout(() => {
      this.record.pipe(map(x => x.forEach(x => {this.fid = x.fid})));
    }, 800);


    this.recordForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
      user: new FormControl('', [Validators.required]),
      action: new FormControl('', [Validators.required]),
      dateOfAction: new FormControl('', [Validators.required])
    });

  }

  onCancel() {
    this.location.back();
  }
  updateRec(f) {
    let upRec: RecordCreation = {
      id: f.id,
      user: f.user,
      action: f.action,
      dateOfAction: f.dateOfAction,
    }
    this.register.upRecords(this.fid, upRec);


    console.log(upRec, f.id, this.fid);
    alert('Sikeres adatbevitel');
    this.location.back();

  }

}

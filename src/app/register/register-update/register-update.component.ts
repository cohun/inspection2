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
  private dat: string;

  constructor(
    private activeRoute: ActivatedRoute,
    private register: RegisterService,
    private location: Location
  ) { }

  ngOnInit() {
    const ide: string = this.activeRoute.snapshot.queryParams.id;
    const user: string = this.activeRoute.snapshot.queryParams.user;
    this.dat = this.activeRoute.snapshot.queryParams.date;
    this.idOld = ide;


    this.register.getToUpdate(ide, user);
    this.record = this.register.recUpdate$;

    this.recordForm = new FormGroup({
      fid: new FormControl('', [Validators.required]),
      id: new FormControl('', [Validators.required]),
      user: new FormControl('', [Validators.required]),
      action: new FormControl('', [Validators.required]),
      dateOfAction: new FormControl(new Date(this.dat), [Validators.required])
    });

  }

  onCancel() {
    this.location.back();
  }

  updateRec(f) {
    // add one day in order to avoid js strange date behaviour
    console.log(f.dateOfAction, new Date(this.dat));

    if (f.dateOfAction.getTime() !== new Date(this.dat).getTime()) {
      const days = f.dateOfAction.getDate()+1;
      console.log(days);
      f.dateOfAction.setDate(days);
    }

    const upRec: RecordCreation = {
      id: f.id,
      user: f.user,
      action: f.action,
      dateOfAction: f.dateOfAction.toISOString().substring(0, 10),
    };
    this.register.upRecords(f.fid, upRec);
    alert('Sikeres adatbevitel');
    this.location.back();

  }

}

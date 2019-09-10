import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegisterService } from '../register.service';
import { Observable } from 'rxjs';
import { RecordCreation } from 'src/app/_interface/record-creation';
import { Record } from "../../_interface/record.model";
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-update',
  templateUrl: './register-update.component.html',
  styleUrls: ['./register-update.component.css']
})
export class RegisterUpdateComponent implements OnInit {
  public record$: Observable<Record[]>;
  public recordForm: FormGroup;
  public idOld: string;
  public userOld: string;
  public actionOld: string;
  public actOld: string;
  public dateOld: string;
  public fid = '';
  public idNew: string;
  public userNew: string;
  public actionNew: string;
  public actNew: string;
  public dateNew: string;
  public actions = ['Vizsgálat', 'Javítás', 'Karbantartás', 'Üzembehelyezés'];

  constructor(
    private activeRoute: ActivatedRoute,
    private register: RegisterService,
    private location: Location
  ) { }

  ngOnInit() {
    this.idOld = this.activeRoute.snapshot.queryParams.id;
    this.userOld = this.activeRoute.snapshot.queryParams.user;
    this.actionOld = this.activeRoute.snapshot.queryParams.action;
    this.dateOld = this.activeRoute.snapshot.queryParams.date;

    this.register.getToUpdate(this.idOld, this.userOld);
    this.record$ = this.register.recUpdate$;

    this.recordForm = new FormGroup({
      fid: new FormControl('', [Validators.required]),
      id: new FormControl('', [Validators.required]),
      user: new FormControl('', [Validators.required]),
      action: new FormControl('', [Validators.required]),
      dateOfAction: new FormControl(new Date(this.dateOld), [Validators.required])
    });

  }
  onChange(val) {
    this.fid = val;
    console.log(this.fid);
  }

  onCancel() {
    this.location.back();
  }

  updateRec(f) {
    // add one day in order to avoid js strange date behaviour
    console.log(f.dateOfAction, new Date(this.dateOld));

    if (f.dateOfAction.getTime() !== new Date(this.dateOld).getTime()) {
      const days = f.dateOfAction.getDate()+1;
      console.log(days);
      f.dateOfAction.setDate(days);
    }
    this.idNew = f.id;
    this.userNew = f.user;
    this.actionNew = f.action;
    this.dateNew = f.dateOfAction.toISOString().substring(0, 10);

    // Updating id:
    if (this.idOld !== this.idNew) {
      this.register.updateIdInRemarks(this.idOld, this.idNew);
    }
    // Updating specProduct
    if (this.actionOld !== this.actionNew || this.idOld !== this.idNew || this.dateOld !== this.dateNew) {
      console.log('specProduct needs to be updated as well');
      this.actionOldTransform(this.actionOld);
      this.actionNewTransform(this.actionNew)
      this.register.updateSpecProduct(this.actOld, this.actNew, this.dateOld, this.dateNew,
      this.idOld, this.idNew, this.userOld, this.userNew);
    }

    setTimeout(() => {

      const upRec: RecordCreation = {
        id: this.idNew,
        user: this.userNew,
        action: this.actionNew,
        dateOfAction: this.dateNew,
      };
      this.register.upRecords(this.fid, upRec);
      this.location.back();

    }, 200);



  }
  actionOldTransform(act) {
    switch (act) {
      case 'Vizsgálat':
        this.actOld = 'inspections';
        break;
      case 'Javítás':
        this.actOld = 'repair';
        break;
      case 'Karbantartás':
        this.actOld = 'maintenance';
        break;
      case 'Üzembehelyezés':
        this.actOld = 'operationStart';
        break;
      default:
        break;
    }
  }
  actionNewTransform(act) {
    switch (act) {
      case 'Vizsgálat':
        this.actNew = 'inspections';
        break;
      case 'Javítás':
        this.actNew = 'repair';
        break;
      case 'Karbantartás':
        this.actNew = 'maintenance';
        break;
      case 'Üzembehelyezés':
        this.actNew = 'operationStart';
        break;
      default:
        break;
    }
  }

}

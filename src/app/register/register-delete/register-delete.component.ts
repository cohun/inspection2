import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegisterService } from '../register.service';
import { Observable } from 'rxjs';
import { RecordCreation } from 'src/app/_interface/record-creation';
import { Record } from "../../_interface/record.model";
import { Location } from '@angular/common';

@Component({
  selector: 'app-register-delete',
  templateUrl: './register-delete.component.html',
  styleUrls: ['./register-delete.component.css']
})
export class RegisterDeleteComponent implements OnInit {
  public record: Observable<Record[]>;
  public isSure = false;
  private fid: string;
  private id: string;
  private user: string;
  private action: string;
  private dateOfAction: string;

  constructor(
    private activeRoute: ActivatedRoute,
    private register: RegisterService,
    private location: Location
  ) { }

  ngOnInit() {
    const ide: string = this.activeRoute.snapshot.queryParams.id;
    const user: string = this.activeRoute.snapshot.queryParams.user;

    this.register.getToUpdate(ide, user);
    this.record = this.register.recUpdate$;

  }

  onCancel() {
    this.location.back();
  }
  onSure(fid, id, user, action, dateOfAction) {
    console.log(fid);
    this.fid = fid;
    this.id = id;
    this.user = user;
    this.action = action;
    this.dateOfAction = dateOfAction;
    this.isSure = !this.isSure;
  }
  actionTransform(act) {
    switch (act) {
      case 'Vizsgálat':
        this.action = 'inspections';
        break;
      case 'Javítás':
        this.action = 'repair';
        break;
      case 'Karbantartás':
        this.action = 'maintenance';
        break;
      case 'Üzembehelyezés':
        this.action = 'operationStart';
        break;
      default:
        break;
    }
  }
  deleteRec() {
    this.actionTransform(this.action);
    this.register.deleteRec(this.fid, this.id, this.user, this.action, this.dateOfAction);
    alert('Sikeres adatbevitel');
    this.location.back();
  }

}

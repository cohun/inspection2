import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegisterService } from '../register.service';
import { Observable } from 'rxjs';
import { RecordCreation } from 'src/app/_interface/record-creation';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-register-update',
  templateUrl: './register-update.component.html',
  styleUrls: ['./register-update.component.css']
})
export class RegisterUpdateComponent implements OnInit {
  public record: Observable<RecordCreation[]>;
  public recordForm: FormGroup;

  constructor(
    private activeRoute: ActivatedRoute,
    private register: RegisterService,
    private location: Location
  ) { }

  ngOnInit() {
    const ide: string = this.activeRoute.snapshot.params.id;

    this.register.getToUpdate(ide);
    this.record = this.register.recUpdate$;

    this.recordForm = new FormGroup({
      id: new FormControl(''),
      user: new FormControl(''),
      action: new FormControl(''),
      dateOfAction: new FormControl('')
    });

  }

  onCancel() {
    this.location.back();
  }
  createRec(f) {

  }

}

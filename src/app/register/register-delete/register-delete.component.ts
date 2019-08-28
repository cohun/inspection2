import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegisterService } from '../register.service';
import { Observable } from 'rxjs';
import { RecordCreation } from 'src/app/_interface/record-creation';
import { Location } from '@angular/common';

@Component({
  selector: 'app-register-delete',
  templateUrl: './register-delete.component.html',
  styleUrls: ['./register-delete.component.css']
})
export class RegisterDeleteComponent implements OnInit {
  public record: Observable<RecordCreation[]>;

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

}

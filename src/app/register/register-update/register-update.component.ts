import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegisterService } from '../register.service';
import { Observable } from 'rxjs';
import { RecordCreation } from 'src/app/_interface/record-creation';

@Component({
  selector: 'app-register-update',
  templateUrl: './register-update.component.html',
  styleUrls: ['./register-update.component.css']
})
export class RegisterUpdateComponent implements OnInit {
  public recUpDate$: Observable<RecordCreation[]>;

  constructor(
    private activeRoute: ActivatedRoute,
    private register: RegisterService
  ) { }

  ngOnInit() {
    const ide: string = this.activeRoute.snapshot.params.id;
    this.register.getToUpdate(ide);
    this.recUpDate$ = this.register.recUpdate$;
  }

}

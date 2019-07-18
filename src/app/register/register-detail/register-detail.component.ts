import { Component, OnInit, DoCheck } from '@angular/core';
import { Record } from "../../_interface/record.model";
import { Router, ActivatedRoute } from "@angular/router";
import { RegisterService } from "../register.service";
import { Observable } from 'rxjs';
import { User } from '../../_interface/user';
@Component({
  selector: 'app-register-detail',
  templateUrl: './register-detail.component.html',
  styleUrls: ['./register-detail.component.css']
})
export class RegisterDetailComponent implements OnInit {
  public user: Observable<User[]>;
  public showProducts;

  constructor(
    private register: RegisterService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

    ngOnInit() {
      const ide: string = this.activeRoute.snapshot.params.id;
      this.register.getUser(ide);
      this.user = this.register.user$;
    }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from 'src/app/auth/auth.service';
import { RegisterService } from 'src/app/register/register.service';
import { Observable, Subscription } from 'rxjs';
import { UserUid } from 'src/app/_interface/userUid';

@Component({
  selector: 'app-sortiment',
  templateUrl: './sortiment.component.html',
  styleUrls: ['./sortiment.component.css']
})
export class SortimentComponent implements OnInit, OnDestroy {
  userUid = 'Felhasználó';
  us: Observable<UserUid[]>;
  authUser: Subscription;
  hUser: Subscription;

  constructor(private router: Router, private authService: AuthService,
              private registerService: RegisterService) { }

  ngOnInit() {
    setTimeout(() => {
      console.log(this.authService.id);
      this.registerService.getUserName(this.authService.id);
      this.hUser = this.registerService.us$.subscribe(x => {
        x.forEach(y => {
          this.userUid = y.user;
          console.log(this.userUid);
        });
      });
    }, 400);
  }
  redirectToSites() {
    const user = this.userUid;
    this.router.navigate([`user/sites`],
    {queryParams: {user}});
  }

  groupDetail() {
    this.router.navigate([`user/detail`])
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.hUser.unsubscribe();
  }

}

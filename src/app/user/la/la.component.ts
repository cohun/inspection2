import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-la',
  templateUrl: './la.component.html',
  styleUrls: ['./la.component.css']
})
export class LaComponent implements OnInit {
  public w: number;
  user: string;

  constructor(private location: Location, private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    const width = window.innerWidth;
    if (width <= 411) {
      console.log('phone detected');
      this.w = 1;
    } else if (width <= 768) {
      console.log('mobile device detected');
      this.w = 2;
    } else {
      console.log('desktop detected');
      this.w = 4;
    }

    this.user = this.activeRoute.snapshot.queryParams.user;
    console.log(this.user);
  }

  textile() {
    const user = this.user;
    this.router.navigate([`user/la/textile`],
    {queryParams: {user}});
  }

  onCancel() {
    this.location.back();
  }

}

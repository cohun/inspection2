import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-textile',
  templateUrl: './textile.component.html',
  styleUrls: ['./textile.component.css']
})
export class TextileComponent implements OnInit {
  public w: number;

  constructor(private location: Location, private router: Router) { }

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
  }

  routeToProducts() {
    this.router.navigate(['/product/products'],
    {queryParams: {user: 'B',
                  group: 'körkötelek',
                  id: '10'  }});
  }

  onCancel() {
    this.location.back();
  }

}

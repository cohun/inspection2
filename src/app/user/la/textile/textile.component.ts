import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-textile',
  templateUrl: './textile.component.html',
  styleUrls: ['./textile.component.css']
})
export class TextileComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }
  onCancel() {
    this.location.back();
  }

}

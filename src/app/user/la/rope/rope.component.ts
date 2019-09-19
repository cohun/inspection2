import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-rope',
  templateUrl: './rope.component.html',
  styleUrls: ['./rope.component.css']
})
export class RopeComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }
  onCancel() {
    this.location.back();
  }

}

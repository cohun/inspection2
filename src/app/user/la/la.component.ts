import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-la',
  templateUrl: './la.component.html',
  styleUrls: ['./la.component.css']
})
export class LaComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }
  onCancel() {
    this.location.back();
  }

}
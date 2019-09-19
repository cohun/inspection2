import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-manual',
  templateUrl: './manual.component.html',
  styleUrls: ['./manual.component.css']
})
export class ManualComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }
  onCancel() {
    this.location.back();
  }

}

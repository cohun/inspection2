import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-chain',
  templateUrl: './chain.component.html',
  styleUrls: ['./chain.component.css']
})
export class ChainComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }
  onCancel() {
    this.location.back();
  }

}

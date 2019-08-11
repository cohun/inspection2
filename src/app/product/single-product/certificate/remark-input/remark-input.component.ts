import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SpecProdCreation } from 'src/app/_interface/specProd-creation';
import { Location } from '@angular/common';

@Component({
  selector: 'app-remark-input',
  templateUrl: './remark-input.component.html',
  styleUrls: ['./remark-input.component.css']
})
export class RemarkInputComponent implements OnInit {
  public fid: string; // gysz.
  public id: string; // srsz.
  public done: string;
  public comment: string;
  public remarkForm: FormGroup;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    this.fid = this.activeRoute .snapshot.queryParams.id;
    this.id = this.activeRoute .snapshot.queryParams.srsz;
    this.remarkForm = new FormGroup({
      kind: new FormControl('', [Validators.required]),
      result: new FormControl('', [Validators.required]),
      done: new FormControl('', [Validators.required]),
      comment: new FormControl('', [Validators.maxLength(100)]),
    });
  }

  createRemark(form) {
    console.log('Hi');
  }

  onCancel() {
    this.location.back();
  }

}

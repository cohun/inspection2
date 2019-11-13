import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserSite } from 'src/app/_interface/user-site';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-new-site',
  templateUrl: './new-site.component.html',
  styleUrls: ['./new-site.component.css']
})
export class NewSiteComponent implements OnInit {
  user: string;
  id: string;
  sites: UserSite[];
  site = [];
  siteForm = new FormGroup({
    name: new FormControl('', Validators.required),
    info: new FormControl('')
  });
  operatorForm = new FormGroup({
    name: new FormControl('', Validators.required),
    position: new FormControl('')
  })

  get siteName() {
    return this.siteForm.get('name');
  }
  get operatorName() {
    return this.operatorForm.get('name');
  }


  constructor(private activeRoute: ActivatedRoute, private location: Location,
              private userService: UserService ) { }

  ngOnInit() {
    this.id = this.activeRoute.snapshot.queryParams.id;

    this.user = this.activeRoute.snapshot.queryParams.user;
  }

  onSiteAdd(form) {
    console.log(form);
    const newSite = {
      name: form.name,
      info: form.info
    };
    console.log(newSite.name);
    this.userService.addSites(this.id, this.user, newSite);
  }
  onOperatorAdd(form) {
    console.log(form);
    const newOperator = {
      name: form.name,
      position: form.position
    };
    this.userService.addOperators(this.id, this.user, newOperator);
  }

  onCancel() {
    this.location.back();
  }

}

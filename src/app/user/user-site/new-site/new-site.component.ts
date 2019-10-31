import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { UserSite } from 'src/app/_interface/user-site';

@Component({
  selector: 'app-new-site',
  templateUrl: './new-site.component.html',
  styleUrls: ['./new-site.component.css']
})
export class NewSiteComponent implements OnInit {
  user: string;
  sites: UserSite[];
  site = [];
  siteForm = new FormGroup({
    name: new FormControl(''),
    info: new FormControl('')
  });
  operatorForm = new FormGroup({
    name: new FormControl(''),
    position: new FormControl('')
  })
  constructor(private activeRoute: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.sites = this.activeRoute.snapshot.queryParams.sites;
    console.log(this.sites);

    this.sites.map(x => {
      this.site.push(x.sites);
      console.log(this.site);
    }

     )
  }

  onCancel() {
    this.location.back();
  }

}

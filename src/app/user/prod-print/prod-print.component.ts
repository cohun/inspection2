import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Productgysz } from 'src/app/_interface/product-gysz';
import { Location } from '@angular/common';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { ProductService } from 'src/app/product/product.service';
import { RegisterService } from 'src/app/register/register.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/_interface/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-prod-print',
  templateUrl: './prod-print.component.html',
  styleUrls: ['./prod-print.component.css']
})
export class ProdPrintComponent implements OnInit {
  prod: Productgysz[];
  type: string;
  length: string;
  descreption: string;
  capacity: string;
  manufacturer: string;
  gysz: string;
  user: string;
  user$: Observable<User[]>
  siteForm: FormGroup;
  info: string = '';
  site: string;
  dates: string;
  dateNext: number;
  public today = new Date();


  constructor(private activeRoute: ActivatedRoute,
              private location: Location,
              private registerService: RegisterService,
              private productService: ProductService) { }

  ngOnInit() {
    this.type = this.activeRoute .snapshot.queryParams.type;
    this.length = this.activeRoute .snapshot.queryParams.length;
    this.descreption = this.activeRoute .snapshot.queryParams.descreption;
    this.capacity = this.activeRoute .snapshot.queryParams.capacity;
    this.manufacturer = this.activeRoute .snapshot.queryParams.manufacturer;
    this.gysz = this.activeRoute .snapshot.queryParams.gysz;
    this.user = this.activeRoute .snapshot.queryParams.user;
    console.log(this.type);
    this.registerService.getUser(this.user);
    this.user$ = this.registerService.user$;
    this.siteForm = new FormGroup({
      name: new FormControl(''),
      info: new FormControl('', Validators.required),
      date: new FormControl(new Date(), [Validators.required])
  })
}

  onSiteAdd(f) {
    console.log(f);
    this.info = f.info;
    this.site = f.name;
    this.dates = f.date.toISOString().substring(0, 10)
    this.dateNext = +this.dates.slice(0, 4) + 1;
    this.siteForm.reset();
    
  }
  get siteInfo() {
    return this.siteForm.get('info');
  }
  get dateInfo() {
    return this.siteForm.get('date');
  }


  back() {
    this.location.back();
  }
  public print()
  {
    var data = document.getElementById('pdf');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 1, position, imgWidth, imgHeight)
      pdf.save(`${this.user}/${this.gysz}.pdf`); // Generated PDF
    });
  }

}

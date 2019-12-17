import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Productgysz } from 'src/app/_interface/product-gysz';
import { Location } from '@angular/common';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { ProductService } from 'src/app/product/product.service';

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
  gysz: string;
  user: string;

  constructor(private activeRoute: ActivatedRoute,
              private location: Location,
              private productService: ProductService) { }

  ngOnInit() {
    this.type = this.activeRoute .snapshot.queryParams.type;
    this.length = this.activeRoute .snapshot.queryParams.length;
    this.descreption = this.activeRoute .snapshot.queryParams.descreption;
    this.gysz = this.activeRoute .snapshot.queryParams.gysz;
    this.user = this.activeRoute .snapshot.queryParams.user;
    console.log(this.type);

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

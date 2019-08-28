import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Remark } from '../../../_interface/remark';
import { SpecProduct } from '../../../_interface/specProduct';
import { RegisterService } from "../../register.service";
import { Observable } from 'rxjs';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-product-gysz',
  templateUrl: './register-product-gysz.component.html',
  styleUrls: ['./register-product-gysz.component.css']
})
export class RegisterProductGyszComponent implements OnInit, OnChanges {
  @Input() gysz: Remark[];
  @Input() srsz: string;
  @Input() user: string;
  public gyszArray = [];
  public kindArray = [];
  public resultArray = [];
  public fidArray = [];
  public typeArray = [];
  public lengthArray = [];
  public descreptionArray = [];
  public specProduct$: Observable<SpecProduct[]>;
  public p1Array = [];
  public p2Array = [];
  public p3Array = [];

  constructor(private registerService: RegisterService, router: Router) { }

  ngOnChanges() {
    this.gyszArray = [];
    this.kindArray = [];
    this.resultArray = [];
    this.p1Array = [];
    this.p2Array = [];
    this.p3Array = [];

    this.gysz.forEach(x => {
      this.gyszArray.push(x.fid);
      this.kindArray.push(x.kind);
      this.resultArray.push(x.result);

      for (const key in x.parts) {
        if (x.result === 'Javítás után megfelelt') {
          continue;
        }
        if (x.parts.hasOwnProperty(key)) {
          const element = x.parts[key];
          this.p1Array.push(x.fid);
          this.p2Array.push(element['db']);
          this.p3Array.push(element['mi']);
        }}
    });

    this.registerService.findProductId(this.gyszArray);
    setTimeout(() => {
      for (let i = 0; i < this.registerService.productId.length; i++) {
        const element = this.registerService.productId[i];
        console.log(element, this.gyszArray[i]);
        this.registerService.getProduct(element);
      }
    }, 300);
    setTimeout(() => {
      this.typeArray = this.registerService.type;
      this.lengthArray = this.registerService.length;
      this.descreptionArray = this.registerService.descreption;
      this.typeArray.length = this.gyszArray.length;
      this.lengthArray.length = this.gyszArray.length;
      this.descreptionArray.length = this.gyszArray.length;
    }, 500);

  }

  ngOnInit() {
/*     this.gysz.forEach(x => {
      this.gyszArray.push(x.fid);
      this.kindArray.push(x.kind);
      this.resultArray.push(x.result);

      for (const key in x.parts) {
        if (x.result === 'Javítás után megfelelt') {
          continue;
        }
        if (x.parts.hasOwnProperty(key)) {
          const element = x.parts[key];
          this.p1Array.push(x.fid);
          this.p2Array.push(element['db']);
          this.p3Array.push(element['mi']);
        }}
    }); */

/*     this.registerService.findProductId(this.gyszArray);
    setTimeout(() => {
      for (let i = 0; i < this.registerService.productId.length; i++) {
        const element = this.registerService.productId[i];
        console.log(element);
        this.registerService.getProduct(element);
      }
    }, 300);
    setTimeout(() => {
      this.typeArray = this.registerService.type;
      this.lengthArray = this.registerService.length;
      this.descreptionArray = this.registerService.descreption;
      this.typeArray.length = this.gyszArray.length;
      this.lengthArray.length = this.gyszArray.length;
      this.descreptionArray.length = this.gyszArray.length;
    }, 500); */

  }

  refresh(): void {
    window.location.reload();
}
public print()
{
  const data = document.getElementById('pdf');
  html2canvas(data).then(canvas => {
    // Few necessary setting options
    const imgWidth = 208;
    const pageHeight = 295;
    const imgHeight = canvas.height * imgWidth / canvas.width;
    const heightLeft = imgHeight;

    const contentDataURL = canvas.toDataURL('image/png')
    const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
    const position = 0;
    pdf.addImage(contentDataURL, 'PNG', 5, position, imgWidth, imgHeight)
    pdf.save(`${this.user}/${this.srsz}.pdf`); // Generated PDF
  });
}

}

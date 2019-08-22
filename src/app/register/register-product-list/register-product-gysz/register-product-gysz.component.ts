import { Component, OnInit, Input } from '@angular/core';
import { Remark } from '../../../_interface/remark';
import { SpecProduct } from '../../../_interface/specProduct';
import { RegisterService } from "../../register.service";
import { Observable } from 'rxjs';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-register-product-gysz',
  templateUrl: './register-product-gysz.component.html',
  styleUrls: ['./register-product-gysz.component.css']
})
export class RegisterProductGyszComponent implements OnInit {
  @Input() gysz: Remark[];
  @Input() srsz: string;
  @Input() user: string;
  public gyszArray = [];
  public kindArray = [];
  public fidArray = [];
  public typeArray = [];
  public lengthArray = [];
  public descreptionArray = [];
  public specProduct$: Observable<SpecProduct[]>;

  constructor(private registerService: RegisterService) { }

  ngOnInit() {
    this.gysz.forEach(x => {
      this.gyszArray.push(x.fid);
      this.kindArray.push(x.kind);
    });

    this.registerService.findProductId(this.gyszArray);
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
    }, 500);

  }

  refresh(): void {
    window.location.reload();
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
    pdf.addImage(contentDataURL, 'PNG', 5, position, imgWidth, imgHeight)
    pdf.save(`${this.user}/${this.srsz}.pdf`); // Generated PDF
  });
}

}

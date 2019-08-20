import { Component, OnInit, Input } from '@angular/core';
import { Remark } from '../../../_interface/remark';
import { SpecProduct } from '../../../_interface/specProduct';
import { RegisterService } from "../../register.service";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register-product-gysz',
  templateUrl: './register-product-gysz.component.html',
  styleUrls: ['./register-product-gysz.component.css']
})
export class RegisterProductGyszComponent implements OnInit {
  @Input() gysz: Remark[];
  public gyszArray = [];
  public kindArray = [];
  public fidArray = [];
  public typeArray = [];
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
        setTimeout(() => {
          this.typeArray.push(this.registerService.type);
        }, 300);
      }
      setTimeout(() => {
        console.log(this.typeArray[1]);

        for (const i of this.typeArray) {
          console.log(i);
        }
      }, 300);


    }, 300);



  }

}

import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Product } from 'src/app/_interface/product';
import { UserService } from '../user.service';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from 'src/app/product/product.service';
import { SpecProdCreation } from 'src/app/_interface/specProd-creation';

@Component({
  selector: 'app-product-choice',
  templateUrl: './product-choice.component.html',
  styleUrls: ['./product-choice.component.css']
})

export class ProductChoiceComponent implements OnInit, OnDestroy {
  @Input() user: string;
  @Input() products: Product[];
  
  @Input() group: string;
  @Input() descreption: string;
  
  public capacities: any = new Set();
  public types: any = new Set();
  public lengths: any = new Set();
  public manufacturers: any = new Set();
  capacity: Product[];
  type: Product[];
  length: Product[];
  manufacturer: Product[];

  product: Product;

  gysz: string;
  tooltipposition = 'right';
  empty = '';
  num: number;
  fid: string;
  step = 0;
  isExpanded = 0;
  sub: Subscription = new Subscription();
  specProdCreate: SpecProdCreation;


  constructor(private userService: UserService,
              private productService: ProductService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.productIni();

    this.products.forEach(x =>  {
      this.capacities.add(x.capacity);
      this.types.add(x.type);
      this.lengths.add(x.length);
      this.manufacturers.add(x.manufacturer);
    });
    
    this.capacity = [...this.capacities].sort()
    this.type = [...this.types].sort()
    this.length = [...this.lengths].sort()
    this.manufacturer = [...this.manufacturers].sort()
  }

  productIni() {
    this.product = {
      group: this.group,
      type: '',
      length: '',
      descreption: this.descreption,
      capacity: '',
      manufacturer: ''
    };
  }

  openSnackBar(typ: string, val: string) {
    switch (typ) {
      case 'type':
        this.isExpanded = 1;
        this.step = 1
        break;
      case 'length':
        this.step = 2
        break;
      case 'capacity':
        this.step = 3
        break;
      case 'manufacturer':
        this.step = 4
        break;
      default:
        break;
    }
    this.product[typ] = val;
    this._snackBar.open(JSON.stringify(this.product[typ]), 'kiválasztva', {
      duration: 2000,
    });
  }

  onGysz(gysz: string) {
    this.gysz = gysz;
    this.empty = '';
    console.log(this.gysz);
    this.isExpanded = 0;
  }

  onOperationStart() {
    this.productService.checkDupl(this.product.type, this.product.length, this.product.descreption,
                                  this.product.capacity, this.product.manufacturer)
    setTimeout(() => {
      this.num = this.productService.length;
      if (this.num !== 0) {
        alert( `Termék beazonosítva,
                tovább a gyáriszám ellenőrzéshez!`);
        this.fidBack();
        this.adOp();
      } else {
        this.productService.addProduct(this.product);
        alert('Termék feltöltve');
        this.fidBack();
        this.adOp();
      }
    }, 600);
    //Get fid:
    this.productService.getFid(this.product.type, this.product.length, this.product.descreption,
                            this.product.capacity, this.product.manufacturer)
  }

  private fidBack() {
    this.sub = this.productService.product$.pipe(map(val => {
      return val.map(x => {
        this.fid = x.fid;
        console.log(this.fid);
      });
    }))
      .subscribe();
  }

  private adOp() {
    this.userService.checkid(this.gysz, this.user);
    setTimeout(() => {
      this.num = this.userService.le;
      if (this.num !== 0) {
        alert('Már létezik ez a gyáriszám!');
        this.gysz = '';
      } else {

        alert('Sikeres adatbevitel');
        this.specProdCreate = {
          fid: this.fid,
          id: this.gysz,
          user: this.user,
          site: 'Raktár',
        };
       /*
        this.productService.addSpecProd(this.specProdCreate);
        console.log(this.specProdCreate); */

        this.userService.addOperantee(this.user,this.gysz, 'üzembehelyezendő', this.fid, this.product);
        console.log(this.product);

        this.gysz = '';
      }
    }, 800);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


}

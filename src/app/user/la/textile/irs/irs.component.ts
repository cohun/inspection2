import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Product } from 'src/app/_interface/product';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { UserUid } from 'src/app/_interface/userUid';
import { AuthService } from 'src/app/auth/auth.service';
import { ProductService } from 'src/app/product/product.service';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/user/user.service';
import { Productgysz } from 'src/app/_interface/product-gysz';

@Component({
  selector: 'app-irs',
  templateUrl: './irs.component.html',
  styleUrls: ['./irs.component.css']
})
export class IrsComponent implements OnInit, OnDestroy {

  products: Product;
  pr: Product[];
  tooltipposition = 'right';
  user: string;
  gysz: string;
  fid: string;
  form: FormGroup;
  public product$: Observable<Productgysz[]>;
  sub: Subscription = new Subscription();
  userName: string;
  panel = false;
  num: number;

  new = [
    {
    site: 'Új beszerzés',
    info: 'Központi raktár',
    products: [
    {
      type: 'irs 10',
      length: '1/2 m',
      descreption: 'körkötél',
      capacity: '1000 kg',
      manufacturer: 'Gutman',
      gysz: '1531'
    },
    {
      type: 'irs 20',
      length: '1/2 m',
      descreption: 'körkötél',
      capacity: '2000 kg',
      manufacturer: 'Gutman',
      gysz: '1550'
    },
    {
      type: 'irs 30',
      length: '1/2 m',
      descreption: 'körkötél',
      capacity: '3000 kg',
      manufacturer: 'Gutman',
      gysz: '1585'
    },
    {
      type: 'irs 40',
      length: '1/2 m',
      descreption: 'körkötél',
      capacity: '4000 kg',
      manufacturer: 'Gutman',
      gysz: '1590'
    }
  ]
  },
  {
    site: '1. műhely',
    info: 'Mátranovák',
    products: [
    {
      type: 'irs 10',
      length: '5/10 m',
      descreption: 'körkötél',
      capacity: '10000 kg',
      manufacturer: 'Gutman',
      gysz: '990'
    },
    {
      type: 'irs 20',
      length: '4/8 m',
      descreption: 'körkötél',
      capacity: '20000 kg',
      manufacturer: 'Gutman',
      gysz: '990'
    },
    ]
  },
  {
    site: '2. műhely',
    info: 'Mátranovák',
    products: [
    {
      type: 'irs 100',
      length: '1/2 m',
      descreption: 'körkötél',
      capacity: '10000 kg',
      manufacturer: 'Gutman',
      gysz: '1990'
    },
    {
      type: 'irs 200',
      length: '2/4 m',
      descreption: 'körkötél',
      capacity: '20000 kg',
      manufacturer: 'Gutman',
      gysz: '2990'
    },
    ]
  }
  ];

  constructor(private location: Location, private _snackBar: MatSnackBar,
              private router: Router, private activeRoute: ActivatedRoute,
              private auth: AuthService, private productService: ProductService,
              private userService: UserService) {}

  ngOnInit() {
    this.formCreate()
    console.log(this.new.length);
    this.productIni();

    this.user = this.activeRoute.snapshot.queryParams.user;
    console.log(this.user);


  }
formCreate() {
  this.form = new FormGroup({
    id: new FormControl('', [Validators.required]),
    manufacturer: new FormControl('')
  });
}

  productIni() {
    this.products = {
      group: 'körkötelek',
      type: 'irs',
      length: '',
      descreption: 'körkötél',
      capacity: '',
      manufacturer: ''
    };
  }

  onDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data,
        event.previousIndex,
        event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex, event.currentIndex);
    }
  }

  openSnackBar(typ: string, val: string, cap?: string) {
    if (typ === 'type') {
      this.products.type = val;
      this.products.capacity = cap;
    } else {
      this.products.length = val;
    }
    this._snackBar.open(JSON.stringify(this.products.type), JSON.stringify(this.products.length), {
      duration: 2000,
    });
  }

  onSubmit(f) {
    this.panel = false;
    this.gysz = f.id;
    this.userName = this.user;
    this.products.manufacturer = f.manufacturer;

    //Check duplicate:
    this.productService.checkDupl(this.products.type, this.products.length, this.products.descreption,
                                  this.products.capacity, this.products.manufacturer);
    setTimeout(() => {
      this.num = this.productService.length;
      if (this.num !== 0) {
        alert('Már van ilyen termék az adatbázisban. OK gomb megnyomása után folytatás');
        this.formCreate();
        this.fidBack();
      } else {
        this.productService.addProduct(this.products);
        alert('Sikeres adatbevitel');
        this.formCreate();
        this.fidBack();
      }
    }, 800);

    //Get fid:
    this.productService.getFid(this.products.type, this.products.length, this.products.descreption, this.products.capacity, this.products.manufacturer)

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

  onOperationStart() {
    this.userService.checkid(this.gysz, this.user);
    setTimeout(() => {
      this.num = this.userService.le;
      if (this.num !== 0) {
        alert('Már létezik ez a gyáriszám!');
        this.gysz = '';
      } else {
        // this.productService.addSpecProd(this.gysz);
        alert('Sikeres adatbevitel');
        this.userService.addOperantee(this.user,this.gysz, 'üzembehelyezendő', this.fid, this.products);
        this.product$ = this.userService.product$;
        this.gysz = '';
      }
    }, 800);
  }

  onCancel() {
    this.location.back();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.sub.unsubscribe();
  }


}

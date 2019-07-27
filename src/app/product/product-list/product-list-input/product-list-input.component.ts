import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Product } from '../../../_interface/product';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-product-list-input',
  templateUrl: './product-list-input.component.html',
  styleUrls: ['./product-list-input.component.css']
})
export class ProductListInputComponent implements OnInit {
  @Input() pGroup: Product[];
  @Input() group: string;
  public productForm: FormGroup;
  public types = [''];
  public lengths = [''];
  public descreptions = [''];
  public capacities = [''];
  public manufacturers = [''];
  public options: Product[];

  constructor(
    private location: Location,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.options = this.pGroup;
    this.gettype();


    this.productForm = new FormGroup({
      type: new FormControl('', [Validators.required]),
      length: new FormControl('', [Validators.required]),
      descreption: new FormControl('', [Validators.required]),
      capacity: new FormControl('', [Validators.required]),
      manufacturer: new FormControl(''),
    });
  }
  createProd(form) {
    const newProd: Product = {
      type: form.type,
      length: form.length,
      descreption: form.descreption,
      capacity: form.capacity,
      manufacturer: form.manufacturer,
      group: this.group
    };
    this.productService.addProduct(newProd);
    console.log(newProd);
    alert('Sikeres adatbevitel');
    this.location.back();
  }

  gettype() {
    this.options.forEach(element => {
    this.types.push(element.type);
    this.lengths.push(element.length);
    this.descreptions.push(element.descreption);
    this.capacities.push(element.capacity);
    this.manufacturers.push(element.manufacturer);
    });
}

  onCancel() {
    this.location.back();
  }

}

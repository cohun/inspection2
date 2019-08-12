import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Remark } from '../../../../_interface/remark';
import { Location } from '@angular/common';
import { ProductService } from 'src/app/product/product.service';

@Component({
  selector: 'app-remark-input',
  templateUrl: './remark-input.component.html',
  styleUrls: ['./remark-input.component.css']
})
export class RemarkInputComponent implements OnInit {
  public fid: string; // gysz.
  public id: string; // srsz.
  public done: string;
  public comment: string;
  public remarkForm: FormGroup;
  public kindArray = ['szerkezeti vizsgálat', 'fővizsgálat', 'vizsgálatot követő javítás', 'rendszeres karbantartás',
                      'rendkívüli javítás', 'üzembehelyezés', 'biztonságtechnikai felülvizsgálat'];
  public resultArray = ['Megfelelt', 'Javítás után megfelelet', 'Nem felelt meg', 'Működőképesen átadva'];
  public doneArray = ['Gerőy Iván', 'Szadlon Norbert', 'Nagy Imre', 'Boros Norbert'];
  public text = 'Figyelem! A vizsgálat csak az elvégzett javítást igazoló jegyzőkönyvvel együtt érvényes!';
  private part = [''];

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.fid = this.activeRoute .snapshot.queryParams.id;
    this.id = this.activeRoute .snapshot.queryParams.srsz;
    const part = new FormGroup({
      db: new FormControl([]),
      mi: new FormControl([]),
    });
    this.remarkForm = new FormGroup({
      kind: new FormControl('', [Validators.required]),
      result: new FormControl('', [Validators.required]),
      done: new FormControl('', [Validators.required]),
      comment: new FormControl('', [Validators.maxLength(150)]),
      parts:  new FormArray([part]),
    });
  }

  get partsForms() {
    return this.remarkForm.get('parts') as FormArray;
  }
  addParts() {
    const part = new FormGroup({
      db: new FormControl([]),
      mi: new FormControl([]),
    });
    this.partsForms.push(part);
  }
  deleteParts(i) {
    this.partsForms.removeAt(i);
  }

  createRemark(form) {
    console.log(form.kind);
    console.log(form.parts.length);
    const pa = [];
    for (let index = 0; index < form.parts.length; index++) {
      pa.push(form.parts[index].db);
      pa.push(form.parts[index].mi);
    }
    console.log(pa);

    const newRem: Remark = {
      fid: this.fid,
      id: this.id,
      kind: form.kind,
      result: form.result,
      done: form.done,
      comment: form.comment,
      parts: form.parts
      }

    this.productService.addRemark(newRem);
    console.log(newRem);
    alert('Sikeres adatbevitel');
    this.location.back();
  }
/*   createRemark(form) {
    const newRem: Remark = {
      id: form.id,
      user: form.user,
      action: form.action,
      dateOfAction: form.date.toISOString().substring(0, 10)
    }
    this.register.addRecords(newReg);
    console.log(newReg);
    alert('Sikeres adatbevitel');
    this.location.back();
  } */

  onCancel() {
    this.location.back();
  }

}

import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Product } from "../../_interface/product";
import { ProductService } from '../product.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import {Router  } from "@angular/router";

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent implements OnInit {
  @Input() public group: string;
  @Input() public user: string;
  @Input() public id: string;

  public displayedColumns: string[] = ['type', 'length', 'descreption', 'capacity', 'manufacturer',
                                       'details', 'update', 'delete'];
  public dataSource = new MatTableDataSource<any>();
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private productService: ProductService,
              private router: Router) { }

  ngOnInit() {
    this.productService.getProducts(this.dataSource, this.group);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public redirectToDetail = (type: string, length: string, descreption: string, capacity: string, manufacturer: string) => {
    this.router.navigate([`/product/single`],
    {queryParams: {type: type,
                  length: length,
                  descreption: descreption,
                  capacity: capacity,
                  manufacturer: manufacturer,
                  user: this.user,
                  id: this.id}});
  }
  public redirectToUpdate = (id: string) => {
    const url = `/register/update/${id}`;
    this.router.navigate([url]);
  }
  public redirectToDelete = (id: string) => {
    const url = `/register/delete/${id}`;
    this.router.navigate([url]);
  }

}

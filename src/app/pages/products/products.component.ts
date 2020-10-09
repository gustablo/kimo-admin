import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { Subscription } from 'rxjs';

import { ProductFilterModel } from 'src/app/models/product/product-filter.model';
import { ProductListModel } from 'src/app/models/product/product-list.model';

import { ProductService } from 'src/app/services/product.service';
import { ProductsModalsImageComponent } from './products-modals/products-modals-image/products-modals-image.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  page = 1;
  limit = 10;
  productFilter = new ProductFilterModel();

  observerIndex$: Subscription;
  
  displayedColumns: string[] = Object.keys(new ProductListModel());
  dataSource = new MatTableDataSource<ProductListModel[]>();

  constructor(
    private productService: ProductService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  ngOnDestroy(): void {
    this.observerIndex$ && this.observerIndex$.unsubscribe();
  }

  getProducts() {
    this.observerIndex$ = this.productService.index(this.page, this.limit, this.productFilter)
      .subscribe(({ data }) => {
        this.dataSource = data;
        // console.log(Object.keys(new ProductListModel()), this.dataSource)
    }, err => {});
  }

  openImage(imgSrc: string) {
    this.dialog.open(ProductsModalsImageComponent, {
      data: { imgSrc },
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductCreateModel } from 'src/app/models/product/product-create.model';
import { ProductListModel } from 'src/app/models/product/product-list.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-create',
  templateUrl: './products-create.component.html',
  styleUrls: ['./products-create.component.scss']
})
export class ProductsCreateComponent implements OnInit {

  form: FormGroup;
  productCreate = new ProductCreateModel();

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      name: [],
      size: [],
      color: [],
      type: [],
      price: [],
      discountPrice: [],
      quantity: [],
    });
  }

  onSubmit() {
    this.productService.store(this.productCreate).subscribe((product: ProductListModel) => {
      this.router.navigate(['dashboard/products']);
    }, err => {})
  }

}

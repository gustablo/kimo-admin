import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductsModule,
    OrdersModule
  ],
  exports: [
  ]
})
export class PagesModule { }

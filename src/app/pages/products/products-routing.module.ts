import { Routes, CanActivate } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ProductsComponent } from './products.component';
import { ProductsCreateComponent } from './products-create/products-create.component';

const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'products-create', component: ProductsCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }

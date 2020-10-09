import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModalsImageComponent } from './products-modals-image/products-modals-image.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [ProductsModalsImageComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  entryComponents: [
    ProductsModalsImageComponent
  ]
})
export class ProductsModalsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuComponent } from './menu/menu.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    MenuComponent
  ]
})
export class ComponentsModule { }

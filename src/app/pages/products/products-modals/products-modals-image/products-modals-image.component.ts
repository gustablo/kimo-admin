import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-products-modals-image',
  templateUrl: './products-modals-image.component.html',
  styleUrls: ['./products-modals-image.component.scss']
})
export class ProductsModalsImageComponent implements OnInit {

  imageSource: string;

  constructor(
    public dialogRef: MatDialogRef<ProductsModalsImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit() {
    this.imageSource = this.data.imgSrc;
  }

  closeImage() {
    this.dialogRef.close();
  }

}

export interface DialogData {
  imgSrc: string;
}

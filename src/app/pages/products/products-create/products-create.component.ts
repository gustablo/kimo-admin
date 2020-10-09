import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ImageModel } from 'src/app/models/image/image.model';
import { ProductImageModel } from 'src/app/models/product-image/product-image.model';
import { ProductCreateModel } from 'src/app/models/product/product-create.model';
import { ProductListModel } from 'src/app/models/product/product-list.model';
import { ImageService } from 'src/app/services/image.service';
import { ProductImageService } from 'src/app/services/product-image.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-create',
  templateUrl: './products-create.component.html',
  styleUrls: ['./products-create.component.scss']
})
export class ProductsCreateComponent implements OnInit {

  form: FormGroup;
  productCreate = new ProductCreateModel();

  imagePath;
  message: string;
  imgURL;
  imageToUpload: any;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private imageService: ImageService,
    private productImageService: ProductImageService,
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
    if (this.imageToUpload) {
      this.storeImage();
      return;
    }

    this.storeProduct();
  }

  storeImage() {
    this.imageService.store(this.imageToUpload).subscribe((image: ImageModel) => {
      this.storeProduct(image.id);
    }, err => {});
  }

  storeProductImage(productId: number, imageId: number) {
    const productImage: ProductImageModel = {
      imageIds: [imageId],
      productId
    };
  
    this.productImageService.store(productImage).subscribe(productImage => {
      this.router.navigate(['dashboard/products']);
    }, err => {})
  }

  storeProduct(imageId?: number) {
    this.productService.store(this.productCreate).subscribe((product: ProductListModel) => {
      if (this.imageToUpload) {
        this.storeProductImage(product.id, imageId);
        return;
      }

      this.router.navigate(['dashboard/products']);
    }, err => { })
  }

  preview(event) {
    if (event.target.files.length <= 0) { return; }

    const mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    const file = event.target.files[0];

    const fileToUpload = file;
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.imageToUpload = formData;

    const reader = new FileReader();
    this.imagePath = event.target.files;
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = () => {
      this.imgURL = reader.result;
    };

  }

  deleteImg() {
    this.imagePath = null;
    this.imageToUpload = null;
    this.message = null;
    this.imgURL = null;
  }

}

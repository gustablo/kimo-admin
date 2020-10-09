import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductImageModel } from '../models/product-image/product-image.model';
import { ServiceURLs } from '../utils/service-urls.utils';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ProductImageService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
  }

  store(model: ProductImageModel): Observable<any> {
    return this.post(model, ServiceURLs.PRODUCT_IMAGES, []);
  }
}

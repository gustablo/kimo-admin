import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ProductFilterModel } from '../models/product/product-filter.model';
import { ProductCreateModel } from '../models/product/product-create.model';

import { ServiceURLs } from '../utils/service-urls.utils';

import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService {

  private mapParams: Map<string, any>;

  constructor(httpChild: HttpClient) {
    super(httpChild);
  }

  index(page: number, limit: number, query: ProductFilterModel): Observable<any> {
    this.mapParams = new Map();
    this.mapParams.set('page', page);
    this.mapParams.set('limit', limit);

    const keys = Object.keys(query);
    
    keys.forEach(key => {
      if (query[key]) {
        this.mapParams.set(key, query[key]);
      }
    })


    return this.query(this.mapParams, ServiceURLs.PRODUCTS, []);
  }

  store(model: ProductCreateModel): Observable<any> {
    return this.post(model, ServiceURLs.PRODUCTS, []);
  }
}

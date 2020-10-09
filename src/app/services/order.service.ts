import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderFilterModel } from '../models/order/order-filter.model';
import { ServiceURLs } from '../utils/service-urls.utils';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseService{

  private mapParams: Map<string, any>;

  constructor(httpChild: HttpClient) {
    super(httpChild);
  }

  index(page: number, limit: number, query: OrderFilterModel): Observable<any> {
    this.mapParams = new Map();
    this.mapParams.set('page', page);
    this.mapParams.set('limit', limit);

    const keys = Object.keys(query);
    
    keys.forEach(key => {
      if (query[key]) {
        this.mapParams.set(key, query[key]);
      }
    })


    return this.query(this.mapParams, ServiceURLs.ORDERS, []);
  }
}

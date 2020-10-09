import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceURLs } from '../utils/service-urls.utils';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService extends BaseService{

  constructor(http: HttpClient) {
    super(http);
  }

  store(image: FormData): Observable<any> {
    return this.postFile(image, ServiceURLs.IMAGES, []);
  }
}

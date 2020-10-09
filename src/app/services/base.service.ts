import { Injectable } from "@angular/core";
import { ServiceURLs } from '../utils/service-urls.utils';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";

@Injectable()
export class BaseService {
  constructor(private http: HttpClient) {}

  private prepareHeader(headers: HttpHeaders | null): object {
    headers = headers || new HttpHeaders();

    headers = headers.set("Content-Type", "application/json");
    headers = headers.set("Accept", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("access_token")
    );

    return { headers };
  }

  /*
   * Realiza uma requisicao do tipo POST
   *
   * @param pathParams
   *           array contendo os valores que irao substituir os valores
   *           entre '{..}' da URL dos servicos
   *
   * @param clazz
   *           objeto que sera enviado no corpo da requisicao
   *
   * @param baseServiceURL
   *           enum contendo a URL do recurso que sera requisitado
   */
  protected post(
    clazz: any,
    baseServiceURL: ServiceURLs,
    pathParams: Array<string>
  ) {
    let url = '';
    if (pathParams != null && pathParams.length > 0) {
      url = environment.api.concat(
        this.buildPathParams(baseServiceURL, pathParams)
      );
    } else {
      url = environment.api.concat(baseServiceURL.toString());
    }

    const httpHeaders = new HttpHeaders();
    const expandedHeaders = this.prepareHeader(httpHeaders);

    return this.http.post(url, JSON.stringify(clazz), expandedHeaders);
  }

  /*
   * Realiza uma requisicao do tipo PUT
   *
   * @param pathParams
   *           array contendo os valores que irao substituir os valores
   *           entre '{..}' da URL dos servicos
   *
   * @param clazz
   *           objeto que sera enviado no corpo da requisicao
   * @param baseServiceURL
   *           enum contendo a URL do recurso que sera requisitado
   */
  protected put(
    clazz: any,
    baseServiceURL: ServiceURLs,
    pathParams: Array<string>
  ) {
    let url: string = "";
    if (pathParams != null && pathParams.length > 0) {
      url = environment.api.concat(
        this.buildPathParams(baseServiceURL, pathParams)
      );
    } else {
      url = environment.api.concat(baseServiceURL.toString());
    }

    const httpHeaders = new HttpHeaders();
    const expandedHeaders = this.prepareHeader(httpHeaders);
    return this.http.put(url, JSON.stringify(clazz), expandedHeaders);
  }

      /*
   * Realiza uma requisicao do tipo PATCH
   *
   * @param pathParams
   *           array contendo os valores que irao substituir os valores
   *           entre '{..}' da URL dos servicos
   *
   * @param clazz
   *           objeto que sera enviado no corpo da requisicao
   *
   * @param baseServiceURL
   *           enum contendo a URL do recurso que sera requisitado
   */
  protected patch(clazz: any, baseServiceURL: ServiceURLs, pathParams: Array<string>) {
    let url = '';
    if (pathParams != null && pathParams.length > 0) {
      url = environment.api.concat(
        this.buildPathParams(baseServiceURL, pathParams)
      );
    } else {
      url = environment.api.concat(baseServiceURL.toString());
    }

    const httpHeaders = new HttpHeaders();
    const expandedHeaders = this.prepareHeader(httpHeaders);

    return this.http.patch(url, JSON.stringify(clazz), expandedHeaders);
  }

  /*
   * Realiza uma requisicao do tipo GET
   *
   * @param pathParams
   *           array contendo os valores que irao substituir os valores
   *           entre '{..}' da URL dos servicos
   *
   * @param baseServiceURL
   *           enum contendo a URL do recurso que sera requisitado
   */
  protected get(
    baseServiceURL: ServiceURLs,
    pathParams: Array<string>
  ): Observable<any> {
    let url: string = "";
    if (pathParams != null && pathParams.length > 0) {
      url = environment.api.concat(
        this.buildPathParams(baseServiceURL, pathParams)
      );
    } else {
      url = environment.api.concat(baseServiceURL.toString());
    }

    const httpHeaders = new HttpHeaders();
    const expandedHeaders = this.prepareHeader(httpHeaders);

    return this.http.get(url, expandedHeaders);
  }

  protected getAddressViaCEP(
    baseServiceURL: ServiceURLs,
    pathParams: Array<string>
  ): Observable<any> {
    const url = this.buildPathParams(baseServiceURL, pathParams);
    return this.http.get(url);
  }

  /*
   * Realiza uma requisicao do tipo DELETE
   *
   * @param pathParams
   *           array contendo os valores que irao substituir os valores
   *           entre '{..}' da URL dos servicos
   *
   * @param baseServiceURL
   *           enum contendo a URL do recurso que sera requisitado
   */
  protected delete(baseServiceURL: ServiceURLs, pathParams: Array<string>) {
    let url: string = "";
    if (pathParams != null && pathParams.length > 0) {
      url = environment.api.concat(
        this.buildPathParams(baseServiceURL, pathParams)
      );
    } else {
      url = environment.api.concat(baseServiceURL.toString());
    }

    const httpHeaders = new HttpHeaders();
    const expandedHeaders = this.prepareHeader(httpHeaders);

    return this.http.delete(url, expandedHeaders);
  }

  /*
   * Realiza uma requisicao com query params do tipo GET
   *
   * @param pathParams
   *           array contendo os valores que irao substituir os valores
   *           entre '{..}' da URL dos servicos
   *
   * @param params
   *           um map de string contendo o nome do parametro e seu valor
   *
   * @param baseServiceURL
   *           enum contendo a URL do recurso que sera requisitado
   */
  protected query(
    params: Map<string, string>,
    baseServiceURL: ServiceURLs,
    pathParams: Array<string>
  ) {
    let url = "";
    if (pathParams != null && pathParams.length > 0) {
      url = environment.api.concat(
        this.buildPathParams(baseServiceURL, pathParams)
      );
    } else {
      url = environment.api.concat(baseServiceURL.toString());
    }

    const httpHeaders = new HttpHeaders();
    const expandedHeaders = this.prepareHeader(httpHeaders);

    const searchParams = this.buildURLSearchParams(params);

    return this.http.get(
      url.concat("?").concat(searchParams.toString()),
      expandedHeaders
    );
  }

  /*
   * Converte o Map em um objeto do tipo URLSearchParams
   *
   * @param mapParams
   *           um map de string contendo os valores que serao convertidos
   */
  private buildURLSearchParams(
    mapParams: Map<string, string>
  ): URLSearchParams {
    const params: URLSearchParams = new URLSearchParams();
    mapParams.forEach((value: string, key: string) => {
      params.set(key, value);
    });
    return params;
  }

  /*
   * Substitui todos os valores entre '{..}' da URL dos servicos
   *
   * @param pathParams
   *           array contendo os valores que irao substituir os valores
   *           entre '{..}' da URL dos servicos
   *
   * @param baseServiceURL
   *           enum contendo a URL do recurso que sera requisitado
   */
  private buildPathParams(
    baseServiceURL: ServiceURLs,
    pathParams: Array<string>
  ) {
    let url: string = baseServiceURL.toString();
    const regex = /\{(.*?)\}/;

    pathParams.forEach(value => {
      const matched = regex.exec(url);
      if (matched) {
        url = url.replace(matched[0], value);
      }
    });
    return url;
  }
}

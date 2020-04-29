import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productUrl: string = `${environment.apiUrl}products`;
  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<Product[]> {
    var requestHeaders = new HttpHeaders();
    requestHeaders.set("X-XSRF-TOKEN", sessionStorage.XSRFRequestToken);
    return this.httpClient.get<Product[]>(`${this.productUrl}`, { headers: requestHeaders, responseType: "json" });
  }

  getProduct(id: number): Observable<Product> {
    var requestHeaders = new HttpHeaders();
    requestHeaders.set("X-XSRF-TOKEN", sessionStorage.XSRFRequestToken);
    return this.httpClient.get<Product>(`${this.productUrl}/${id}`, { headers: requestHeaders, responseType: "json" });
  }

  addProduct(newProduct: Product): Observable<Product> {
    var requestHeaders = new HttpHeaders();
    requestHeaders.set("X-XSRF-TOKEN", sessionStorage.XSRFRequestToken);
    return this.httpClient.post<Product>(this.productUrl, newProduct, { headers: requestHeaders, responseType: "json" });
  }

  updateProduct(exsitingProduct: Product): Observable<Product> {
    var requestHeaders = new HttpHeaders();
    requestHeaders.set("X-XSRF-TOKEN", sessionStorage.XSRFRequestToken);
    return this.httpClient.put<Product>(this.productUrl + '/UpdateProductDetails/',exsitingProduct, { headers: requestHeaders, responseType: "json" });
  }

  deleteProduct(id: string): Observable<number> {
    var requestHeaders = new HttpHeaders();
    requestHeaders.set("X-XSRF-TOKEN", sessionStorage.XSRFRequestToken);
    return this.httpClient.delete<number>(this.productUrl + '/Delete?id=' + id, { headers: requestHeaders, responseType: "json" });
  }

  search(type: string, value: string): Observable<number> {
    var requestHeaders = new HttpHeaders();
    requestHeaders.set("X-XSRF-TOKEN", sessionStorage.XSRFRequestToken);
    return this.httpClient.get<number>(this.productUrl + "/" + type + "/" + value, { headers: requestHeaders, responseType: "json" });
  }
}

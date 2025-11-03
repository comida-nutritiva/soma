import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model'; 
import { Optional } from '../models/optional.model'; 
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private opSubjec = new BehaviorSubject<Optional[]>([]);
  opSub$ = this.opSubjec.asObservable();
  private optionals : Optional[] = [];

  constructor(private http: HttpClient) {
    this.opSub$ = this.http.get<Optional[]>('assets/products/optionals.json');
    this.opSub$.subscribe(data =>{
      this.optionals = data;
    });
    
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('assets/products/products.json');
  }

  getProductById(id: number): Observable<Product[]> {
    return this.http.get<Product[]>('assets/products/products.json');
  }

  getOptionals(): Optional[]{
    return this.optionals;
  }

  getProductsPerOrder(): Observable<Product[]> {
    return this.http.get<Product[]>('assets/products/perOrder.json');
  }
  cleanOptionals(){
    this.opSub$.subscribe(data =>{
      this.optionals = data;
    });
  }




}

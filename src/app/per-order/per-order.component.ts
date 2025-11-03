import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from '../models/product.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-per-order',
  imports: [NgFor],
  templateUrl: './per-order.component.html',
  styleUrl: './per-order.component.css'
})
export class PerOrderComponent implements OnInit {

  products: Product[] = [];
  last : Product = {
    id:0,
    description:"",
    img:"",
    name:"",
    price:0
  };

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.productService.getProductsPerOrder().subscribe(data => {
      this.products = data;
      this.last = this.products.at(-1)!;
    });
  }


}

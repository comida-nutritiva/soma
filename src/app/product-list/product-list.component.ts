import { Component } from '@angular/core';
import { CardComponent } from "../components/card/card.component";
import { OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { NgFor } from '@angular/common';
import { Optional } from '../models/optional.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CardComponent, NgFor],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  optionals: Optional[] = [];
  constructor(private productService: ProductsService) {}
  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

}

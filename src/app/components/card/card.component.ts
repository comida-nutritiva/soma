import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { ModalComponent } from "../modal/modal.component";
import { Product } from '../../models/product.model';
import { Optional } from '../../models/optional.model';
@Component({
  selector: 'app-card',
  imports: [ModalComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
@Input() product: Product = {
  id:0,
  description:"",
  img:"",
  name:"",
  price:0
};

}

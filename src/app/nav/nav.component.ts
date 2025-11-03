import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbOffcanvas, NgbOffcanvasConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgFor, NgIf } from '@angular/common';
import { CartService } from '../services/cart.service';
import { Cart } from '../models/cart.model';
import { ModalPayComponent } from '../components/modal-pay/modal-pay.component';
@Component({
  selector: 'app-nav',
  imports: [NgFor, NgIf, ModalPayComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',	
  providers: [NgbOffcanvasConfig, NgbOffcanvas],
})
export class NavComponent implements OnInit {

  totalCart: number=0;
  cart : Cart= new Cart([]);
  total: number=0;

  constructor(
		config: NgbOffcanvasConfig,
		private offcanvasService: NgbOffcanvas,
    private cartService:CartService
	) {
		config.position = 'end';
		config.backdropClass = 'bg-info';
		config.keyboard = false;
    config.animation=true;
	}


  ngOnInit(): void {
    this.cartService.cartSub$.subscribe(data => {
      this.cart = data;
      this.total = this.cart.getTotalValue();
      this.totalCart = this.cart.getCart().length;
    });
  }


  open(content: TemplateRef<any>) {
		this.offcanvasService.open(content);
	}

  removeItem(id:number){
    this.cartService.removeItem(id);
  }

}

import { Component } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { Optional } from '../../models/optional.model';
import { NgFor, NgIf } from '@angular/common';
import { OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ProductsService } from '../../services/products.service';
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
	providers: [NgbModalConfig, NgbModal],
})
export class ModalComponent implements OnInit {

	total : number = 0;
	totalCart:number=0;
	optionalsCart : Optional[]=[];
	warn: string="";
	modalRef: any;

	@Input() product: Product = {
		id:0,
		description:"",
		img:"",
		name:"",
		price:0
	};

	optionals: Optional[]=[];
	  
	
	constructor(
		private cartService: CartService, 
		config: NgbModalConfig, 
		private modalService: NgbModal,
		private productService: ProductsService
	) {
		config.backdrop = 'static';
		config.keyboard = false;
		config.centered = true;
		config.modalDialogClass
		this.productService.getOptionals().forEach(data =>{
			this.optionals.push(new Optional(data.id, data.name, data.price, data.max, data.count));
		})
	}

	ngOnInit(): void {

	}


	open(content: any) {
		this.total=this.product.price;
		this.modalRef = this.modalService.open(content);
	}

	plus(op :Optional){
		const index = this.optionalsCart.findIndex(p => p.id === op.id);
		if (index === -1) {
			op.count = 1;
			this.optionalsCart.push(op);
		} else {
			if (op.count < op.max) {
				op.count++;
				op.price = op.price * op.count;
			} else {
				this.warn = "Se alcanzó la cantidad máxima para " + op.name;
				setTimeout(() => {
				this.warn = '';
				}, 5000);
			}
		}
		this.totalCart = this.optionalsCart.reduce((total, p) => total + p.price, 0);
		this.total = this.product.price + this.totalCart;
	}

	minus(op:Optional){
		const index = this.optionalsCart.findIndex(p => p.id === op.id);
		if (index !== -1) {
			if (op.count !==0){
				op.price = op.price/op.count;
			}
			if (op.count <= 1) {
				this.optionalsCart.splice(index, 1);
			}
			op.count--;
			this.totalCart = this.optionalsCart.reduce((total, p) => total + p.price * p.count, 0);
			this.total = this.product.price + this.totalCart;
		}
	}

	close(){
		this.cartService.addItem(this.product, this.optionalsCart);
		this.optionalsCart = [];
		this.productService.cleanOptionals();
		this.optionals = this.productService.getOptionals();
		this.modalRef?.close('');
	}
}

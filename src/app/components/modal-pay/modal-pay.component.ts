import { NgIf, NgClass, NgFor } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule,  } from '@angular/forms';
import { 
	NgbModal,
	NgbModalConfig,
	NgbDatepickerModule,
	NgbInputDatepickerConfig,
	NgbDropdownModule,
	NgbTimepickerModule,
	NgbDateStruct
} 
from '@ng-bootstrap/ng-bootstrap';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-modal-pay',
  imports: [
	NgbDatepickerModule, 
	FormsModule, 
	NgIf, NgClass, NgFor, NgbTimepickerModule, ReactiveFormsModule, NgbDropdownModule],
  templateUrl: './modal-pay.component.html',
  styleUrl: './modal-pay.component.css',
  providers : [NgbInputDatepickerConfig],
  encapsulation: ViewEncapsulation.None
})
export class ModalPayComponent {
	modalRef: any;
	//tuggles
	now : boolean = false;
	later: boolean = false;
	pickUp : boolean = false;
	delivery: boolean = false;
	//delivery inputs
	residence :string="";
	reference : string ="";
	//paymethod
	payMethodSelected: string = "";
	//date time
	date: Date = new Date();
	dayMonth: { day: number; month: number } = {day:this.date.getDate(), month: this.date.getMonth() + 1};
	timeNow : { hour: number; minute: number } = { hour: this.date.getHours(), minute: this.date.getMinutes()};
	timeToSend = this.timeNow;
	model: NgbDateStruct = {year:this.date.getFullYear(), month:this.date.getMonth() + 1, day:this.date.getDate()};	
	//model: NgbDateStruct = {year:2025, month:5 + 1, day:26};	
	minDate: NgbDateStruct = this.model;
	maxDate: NgbDateStruct = {
	  year: this.date.getFullYear(),
	  month: this.date.getMonth() + 2,
	  day: 31
	};

	//warns
	outOfRange: {can:boolean, msj:string}={can:true, msj:"Dentro del horario de atencion/despacho"};
	arrWarns : {warn: string, active: boolean}[] = [
		{warn: "Debe elegir delivery", active: false},
		{warn: "Debe que elgir momento de entrega", active: false},
		{warn: "Debe que elgir el metodo de pago", active: false},
		{warn: "El carrito esta vacio", active: false},
	];

	constructor(
		config: NgbModalConfig, 
		private modalService: NgbModal,
		dateConfig: NgbInputDatepickerConfig,
		private cartService: CartService
	) {
		config.backdrop = 'static';
		config.keyboard = false;
		config.centered = true;
		config.modalDialogClass;

		dateConfig.outsideDays = 'hidden';
		dateConfig.autoClose = 'outside';
		dateConfig.placement = ['top-start', 'top-end'];
	}

	ngOnInit(): void {
		this.outOfRange.can = this.getCanOrder(this.timeNow);
		this.outOfRange.can? this.outOfRange.msj = "Dentro del horario de atencion/despacho": this.outOfRange.msj = "Fuera del horario de atencion/despacho, programe el pedido seleccionando fecha y hora";
		setInterval(() => {
			this.date = new Date();
			this.timeNow = { hour: this.date.getHours(), minute: this.date.getMinutes()}; // Actualiza la instancia completa
		  }, 60000); // cada minuto
	}


	getCanOrder(t:{hour:number, minute:number}): boolean{
		if ( t.hour>=13 && t.hour<=16 || t.hour>=20 && t.hour<=23 ){
			return true;
		}
		return false;
	}
	

	whenOnCheck(opcion: number) {	
		if (opcion === 2 && this.getCanOrder(this.timeNow)){ 
			this.now = true;
			this.later=false;
		}
		if (opcion === 1 ) {
			this.later = true;
			this.now = false;
		}	

		if (opcion === 2 && !this.getCanOrder(this.timeNow)){ 
			this.pickUp = false;
			this.later = true;
			this.now = false;
			this.outOfRange.msj = "Fuera del horario de atencion/despacho, programe e pedido seleccionando fecha y hora";
			this.outOfRange.can = false;
		}
		this.arrWarns[1].active=false;
	}

	pickUpOnCheck(opcion: number) {
		if (opcion === 1){ 
			this.pickUp = true;
			this.delivery=false;
		}
		if (opcion === 2) {
			this.delivery = true;
			this.pickUp = false;
			
		}
		this.arrWarns[0].active=false;
	}

	payMethod(op: string) : void {
		this.payMethodSelected = op;
		this.arrWarns[2].active=false;
	}

	open(content: any) {
		this.modalRef = this.modalService.open(content);
	}

	send(){
		let ready = true;
		!this.pickUp && !this.delivery ? this.arrWarns[0].active = true: this.arrWarns[0].active = false;
		!this.now && !this.later ? this.arrWarns[1].active = true : this.arrWarns[1].active = false;;
		this.payMethodSelected == "" ? this.arrWarns[2].active = true : this.arrWarns[2].active = false;
		this.arrWarns.map(w => {
			if (w.active){
				ready = false;
			}
		});
		if (ready){
			let deliveryIfo = this.cartService.getDeliveryInfo();
			this.pickUp? deliveryIfo.deliveryType = 'PickUp' : deliveryIfo.deliveryType = 'Delivery';
			if (deliveryIfo.deliveryType === 'Delivery'){
				deliveryIfo.setDeliveryDetails(this.residence, this.reference);
				deliveryIfo.setScheduledTime(this.dayMonth, this.timeToSend);
			}
			this.now? deliveryIfo.timeType = 'now':deliveryIfo.timeType = 'scheduled';
			if (deliveryIfo.timeType === 'scheduled'){
				deliveryIfo.setScheduledTime(this.dayMonth, this.timeToSend)
			}
			deliveryIfo.payMethod = this.payMethodSelected=== "Efectivo"?  'cash' : 'transfer'; 
			let b = this.cartService.sendMsg();
			if (!b){
				//cart empty b==true 
				this.arrWarns[3].active=true;
			}{
				setTimeout(()=>{
					window.location.reload();
				}, 5000);
			}
		}
	}

	hourOnChange(t:{hour: number, minute:number}){
		//el horario de atencion arranca 13 y termina a las 16
		// a la noche arranca a las 20hs y termina a las 23

		//si esta seleccionando para despues
		if(this.later){
			//y la hora que selecciono es menor a la hora actual error
			if (t.hour < this.timeNow.hour){

			}
		}

		if ( this.getCanOrder(t)){
			this.outOfRange.msj = "Dentro del horario de atencion/despacho";
			this.outOfRange.can = true;
			this.timeToSend = t;
		}else{
			this.outOfRange.msj = "Fuera del horario de atencion/despacho";
			this.outOfRange.can = false;
		}
	}

	dateChange(d: number, m:number){
		this.dayMonth.day = d;
		this.dayMonth.month = m;
	}

}

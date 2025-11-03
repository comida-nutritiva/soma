import { Injectable } from '@angular/core';
import { Cart } from '../models/cart.model';
import { Product } from '../models/product.model';
import { Optional } from '../models/optional.model';
import { BehaviorSubject } from 'rxjs';
import { DeliveryInfo } from '../models/deliveryInfo';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private deliveryInfo : DeliveryInfo = new DeliveryInfo();
  private cartSubject = new BehaviorSubject<Cart>(new Cart([]));
  cartSub$ = this.cartSubject.asObservable();


  constructor() {
  }

  addItem(p: Product, o:Optional[]){
    const cart = this.cartSubject.value;
    cart.addItem(p, o);
    const c = new Cart(cart.getCart());
    this.cartSubject.next(c);
  }

  removeItem(id:number){
    const cart = this.cartSubject.value;
    cart.removeItemByItemId(id);
    const c = cart;
    this.cartSubject.next(c);
  }
  
  getTotalValue():number{
    return this.cartSubject.value.getTotalValue();
  }

  getCart(): Cart{
    return this.cartSubject.value;
  }

  getDeliveryInfo(): DeliveryInfo{
    return this.deliveryInfo;
  }

  sendMsg(): boolean{
    if(this.cartSubject.value.getTotalValue()>0){
      let url = this.createMsg(this.deliveryInfo, this.cartSubject.value);
      window.open(url, '_blank');
      return true;
    }else{
      return false;
    }

  }

  private createMsg(d: DeliveryInfo, c: Cart) : string{
    let msg = `✅ *NUEVO PEDIDO* \n\n`;
    // para mas adelante
    //msg += `🧍‍♂️ Cliente: ${d.client}\n`;
    //msg += `📞 Teléfono: ${d.phone}\n\n`;
  
    msg += `📦 Pedido:\n`;
    c.cartItem.forEach(item => {
      msg += `*-${item.product.name}* ($${item.product.price})\n`;
      item.optionals.forEach(op => {
        msg +="         " + `   - x${op.count} ${op.name} ($${op.price*op.count})\n`;
      });
    });
  
    msg += `\n *Total:* $${c.getTotalValue()}\n\n`;
    msg += `🕒 *Entrega:* ${d.deliveryType}\n`;
    if (d.deliveryType === 'Delivery') {
      msg += `🏠 *Dirección:* ${d.deliveryDetails?.address}\n`;
      if (d.deliveryDetails?.reference) {
        msg += `📌 *Referencia:* ${d.deliveryDetails?.reference} - \n`;
      }
    } else {
      msg += `(retira en Italia 1245)\n`;
    }
  
    if (d.timeType === 'scheduled') {
      msg += `\n🕒 *Programado para:*\n📅 Fecha: ${d.scheduledTime?.date.day}/${d.scheduledTime?.date.month} \n🕐 Hora: ${d.scheduledTime?.time.hour}:${d.scheduledTime?.time.minute}\n`;
    } else {
      msg += `\n🕒 *Entrega: Lo antes posible*\n`;
    }
  
    let deliveryType = d.payMethod === 'cash'? "Efectivo":"Transferencia"; 
    msg += `\n✅ *Método de pago:* ${deliveryType}\n`;
    msg += `\n---\n📍 Enviado desde la tienda online`;
  
    const msgEncode = encodeURIComponent(msg);
    const number = '+542494205923'; // número de comercio en formato internacional sin "+"
    const urlWhatsApp = `https://wa.me/${number}?text=${msgEncode}`;

    return urlWhatsApp;
  }



}

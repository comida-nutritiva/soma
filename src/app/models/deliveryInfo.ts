export type DeliveryType = 'PickUp' | 'Delivery';
export type TimeType = 'now' | 'scheduled';
export type PayMerhod = 'cash' | 'transfer';

class DeliveryDetails {
  address: string;
  reference: string;

  constructor(a: string, r:string){
    this.address = a;
    this.reference = r;
  }
}

class ScheduledTime {
  date: { day: number; month: number }; 
  time: { hour: number; minute: number };
  constructor(d: { day: number; month: number }, t :  { hour: number; minute: number }){{
    this.date=d;
    this.time = t;
  }

  }
}

export class DeliveryInfo {
    deliveryType: DeliveryType = 'PickUp';
    timeType: TimeType = 'now';
    payMethod: PayMerhod = 'cash';
    deliveryDetails?: DeliveryDetails;
    scheduledTime?: ScheduledTime;

    setDeliveryDetails(a: string, r:string){
      this.deliveryDetails = new DeliveryDetails(a, r);
    }
    setScheduledTime(d: { day: number; month: number }, t: { hour: number; minute: number }){
      this.scheduledTime = new ScheduledTime(d, t);
    }
}
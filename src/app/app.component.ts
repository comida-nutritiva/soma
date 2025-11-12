import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { HeadComponent } from './head/head.component';
import { ProductListComponent } from "./product-list/product-list.component";
import { NutritionalFactComponent } from './nutritional-fact/nutritional-fact.component';
import { PerOrderComponent } from './per-order/per-order.component';
import { NavComponent } from './nav/nav.component';
import { isPlatformBrowser } from '@angular/common';
import { getAnalytics, setUserId } from 'firebase/analytics';

@Component({
  selector: 'app-root',
  imports: [
    HeadComponent,
    ProductListComponent,
    NutritionalFactComponent,
    PerOrderComponent,
    NavComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})



export class AppComponent  implements OnInit {
  title = 'soma';

  private platformId = inject(PLATFORM_ID);

  ngOnInit() {
    //creacion de ID por navegador en client side rendering
    if (!isPlatformBrowser(this.platformId)) return;

    let userId = localStorage.getItem('user_id');
    if (!userId) {
      userId = crypto.randomUUID(); 
      localStorage.setItem('user_id', userId);
    }

    const analytics = getAnalytics();
    setUserId(analytics, userId);
  }
}

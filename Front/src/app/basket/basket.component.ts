import { Component } from '@angular/core';
import { ProductSericeService } from '../service/product-serice.service';

@Component({
  selector: 'app-basket',
  imports: [],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.css'
})
export class BasketComponent {
  private _productService: ProductSericeService;
  basket: any[] = [];

  constructor(ProductSericeService: ProductSericeService) {
    this._productService = ProductSericeService;
  }

  getBasket() {
    this.basket = this._productService.getBasket();
  }

  removeProductBasket(product: any) {
    this._productService.removeProductBasket(product);
    this.getBasket();
  }
}

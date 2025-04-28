import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class ProductSericeService {
  private products: any = [];
  private basket: any = [];


  constructor() {}
  async getProducts() {
    try {
      const res = await fetch(
        'http://localhost:5000/author/products'
      )
        .then((res) => res.json())
        .then((data) => (this.products = data));
    } catch {
      console.error();
    }
    return this.products;
  }

  async delProduct(id: any) {
    try {
      await axios.delete(`http://localhost:5000/author/delproduct/${id}`);
    } catch (error) {
      console.log(error);
    }
  }

  async getProduct(id: any) {
    try {
      let res = await axios.get(`http://localhost:5000/product/product/${id}`);
      return res.data
    } catch (error) {
      console.log(error);
      return error
    }
  }

  getBasket(): any[] {
    const storedBasket = localStorage.getItem('basket');
    if (storedBasket) {
      this.basket = JSON.parse(storedBasket);
    } else {
      this.basket = [];
    }
    return this.basket;
  }

  addProductBasket(product: any) {
    if (!this.basket.some((prod: any) => prod.id == product.id)) {
      let productBasket = {
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        countBasket: 1,
      };
      this.basket.push(productBasket);
      localStorage.setItem('basket', JSON.stringify(this.basket));
    }
  }
  removeProductBasket(product: any) {
    const index = this.basket.findIndex((prod: any) => prod.id === product.id);
    if (index !== -1) {
      this.basket.splice(index, 1);
      localStorage.setItem('basket', JSON.stringify(this.basket));
    }
  }


}

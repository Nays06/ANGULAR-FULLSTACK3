import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import axios from "axios";

@Injectable({
  providedIn: "root",
})
export class ProductSericeService {
  private products: any = [];
  private basket: any = [];

  constructor(private http: HttpClient) {}

  async getProducts() {
    try {
      await fetch("http://localhost:5000/product/products")
        .then((res) => res.json())
        .then((data) => (this.products = data));
    } catch {
      console.error();
    }
    return this.products;
  }

  addProduct(productName: any, productPrice: any, productDescription: any, productImage: any) {
    const formData = new FormData();
    formData.append('name', productName);
    formData.append('price', productPrice);
    formData.append('description', productDescription);
    formData.append('image', productImage);
  
    return this.http.post("http://localhost:5000/product/addProduct", formData);
  }

  delProduct(id: any) {
      return this.http.delete(`http://localhost:5000/product/delproduct/${id}`);
  }

  async getProduct(id: any) {
    try {
      let res = await axios.get(`http://localhost:5000/product/product/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  editProduct(product: any) {
    return this.http.patch(
      `http://localhost:5000/product/update/${product._id}`,
      {
        name: product.name,
        price: product.price,
        description: product.description,
      }
    );
  }

  async editProduct2(product: any, token: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-type': "application/json; charset=utf-8",
    }

    try {
      let res =  await axios.patch(
        `http://localhost:5000/product/update/${product._id}`,
        {
          name: product.name,
          price: product.price,
          description: product.description,
        },
        {
          headers
        }
      );
      return res
    } catch (error) {
      console.log(error);
      return error
    }
  }

  getBasket(): any[] {
    const storedBasket = localStorage.getItem("basket");
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
      localStorage.setItem("basket", JSON.stringify(this.basket));
    }
  }

  removeProductBasket(product: any) {
    const index = this.basket.findIndex((prod: any) => prod.id === product.id);
    if (index !== -1) {
      this.basket.splice(index, 1);
      localStorage.setItem("basket", JSON.stringify(this.basket));
    }
  }
}

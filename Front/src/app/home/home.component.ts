import { Component } from '@angular/core';
import { ProductSericeService } from '../service/product-serice.service';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import axios from "axios";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [NgClass, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private _productService: ProductSericeService;
  products: any[] = [];
  addCart: { [key: number]: boolean } = {};
  basket: any[] = [];
  productName = ""
  productDescription = "";

  productPrice = ""
  productImage: any = "https://paint-center.ru/storage/article/new-product.png"
  error = ""
  modal: boolean = false
  filterProducts: any[] = [];

  constructor(ProductSericeService: ProductSericeService, private router: Router) {
    this._productService = ProductSericeService;
  }

  goToProduct(id: number) {
    this.router.navigate(['/product', id]);
  }

  async ngOnInit() {
    this.products = await this._productService.getProducts();
    this.filterProducts = this.products;
  }

  addProductBasket(product: any) {
    this._productService.addProductBasket(product);
    this.addCart[product.id] = true;
  }
  closeModal(){
    this.modal = false;
    this.clearForm();
  }
  clearForm() {
    this.productName = "";
    this.productPrice = "";
    this.productImage = "";
    this.productDescription = "";
    this.error = "";
  }
  

  onfileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        this.error = "Допустимы только изоображения JPEG , JPG или PNG";
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        this.error = "Размер файла не должен привышать 2МБ";
        return;
      }

      this.productImage = file;
      this.error = " ";
    }
  }

  async addProduct() {    
    try {
      if (this.productName && this.productPrice && this.productDescription && this.productImage) {
        const formData = new FormData();
        formData.append('name', this.productName);
        formData.append('price', this.productPrice);
        formData.append('description', this.productDescription);
        formData.append('image', this.productImage); 
  
        await axios.post("http://localhost:5000/author/addProduct", formData, {
  
        });
  
        
        this.clearForm();
        this.closeModal();
      } else {
        this.error = "Нужно заполнить все поля";
      }
    } catch (error) {
      console.log(error);
      this.error = "Ошибка при добавлении продукта";
    }
  }

  async delProduct(id: any) {
    this._productService.delProduct(id)

    this.filterProducts = this.filterProducts.filter(el => el._id !== id)
  }
  
  setModal() {
    this.modal = true;

  }
  search(event: Event) {
    const searchText = (event?.target as HTMLInputElement).value.toLowerCase();
    if (searchText) {
      this.filterProducts = this.products.filter((product: any) => product.name.toLowerCase().includes(searchText));
    } else {
      this.filterProducts = this.products;
    }
    console.log(this.filterProducts);
  }

}
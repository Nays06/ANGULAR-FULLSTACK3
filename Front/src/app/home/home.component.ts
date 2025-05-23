import { Component } from '@angular/core';
import { ProductSericeService } from '../service/product-serice.service';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import axios from "axios";
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-home',
  imports: [NgClass, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private _productService: ProductSericeService;
  isAdmin: boolean = false

  products: any[] = [];
  addCart: { [key: number]: boolean } = {};
  basket: any[] = [];
  productName = ""
  productDescription = "";

  productPrice = ""
  productImage: any = ""
  error = ""
  modal: boolean = false
  filterProducts: any[] = [];

  constructor(ProductSericeService: ProductSericeService, private router: Router, private authorization: LoginService) {
    this._productService = ProductSericeService;
  }

  // constructor(private authorization: LoginService) {}

  // ngOnInit() {
  //   this.authorization.getProfile().subscribe({
  //     next: (res: any) => {
  //       this.user = res.user;
  //       console.log(this.user);
        
  //     },
  //     error: (error: any) => {
  //       console.error('Error fetching profile:', error);
  //     }
  //   });
  // }

  goToProduct(id: number) {
    this.router.navigate(['/product', id]);
  }

  goToEdit(id: number) {
    this.router.navigate(['/edit', id]);
  }

  async ngOnInit() {
    this.products = await this._productService.getProducts();
    this.filterProducts = this.products;

    this.authorization.getProfile().subscribe({
      next: (res: any) => {
        this.isAdmin = res.user.roles[0] === "ADMIN";
        console.log(this.isAdmin);
      },
      error: (error: any) => {
        console.error('Error fetching profile:', error);
      }
    });
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
    this.productImage = [];
    this.productDescription = "";
    this.error = "";
  }
  

  onfileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }
  
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    const maxSize = 2 * 1024 * 1024; // 2MB
    const validFiles: File[] = [];
    let errorMessage = "";
  
    Array.from(input.files).forEach((file, index) => {
      if (!allowedTypes.includes(file.type)) {
        errorMessage += `<span title="${file.name}">Файл ${index + 1}: Допустимы только изображения JPEG, JPG или PNG</span><br>`;
        return;
      }
  
      if (file.size > maxSize) {
        errorMessage += `<span title="${file.name}">Файл ${index + 1}: Размер файла не должен превышать 2МБ</span><br>`;
        return;
      }
  
      validFiles.push(file);
    });
  
    if (errorMessage) {
      this.error = errorMessage;
    } else {
      this.error = "";
      this.productImage = validFiles;
    }
  }
  

  async addProduct() {
    try {
      if (this.productName && this.productPrice && this.productDescription) {
        this._productService.addProduct(this.productName, this.productPrice, this.productDescription, this.productImage).subscribe(
          (response: any) => {
            console.log('Успешно:', response); 
            this.filterProducts.push(response.product);
          },
          error => {
            this.router.navigate(['/login']);
          }
        );
        

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
    this._productService.delProduct(id).subscribe(
      response => {console.log('Успешно:', response); this.filterProducts = this.filterProducts.filter(el => el._id !== id)},
      error => {this.router.navigate(['/login']);}
    );
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
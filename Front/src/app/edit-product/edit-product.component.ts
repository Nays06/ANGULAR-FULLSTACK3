import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductSericeService } from '../service/product-serice.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  imports: [FormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {
  constructor(private route: ActivatedRoute, private productService: ProductSericeService, private router: Router) { }

  id: any = ""
  product: any = {}
  name: string = ""
  price: number = 0
  description: string = ""

  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.product = await this.productService.getProduct(this.id);
      
      this.name = this.product?.name
      this.price = this.product?.price
      this.description = this.product?.description
      
    }
  }

  editProduct() {
    this.productService.editProduct({ _id: this.product._id, name: this.name, price: this.price, description: this.description }).subscribe({
      next: (res: any) => {
        alert(res.message);
        this.router.navigate(['/home']);
      },
      error: (error: any) => {
        console.error('Error editing product:', error);
        this.router.navigate(['/login']);
      }
    });
  }
}

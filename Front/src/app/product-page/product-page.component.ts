import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductSericeService } from '../service/product-serice.service';
import axios from 'axios';

@Component({
  selector: 'app-product-page',
  imports: [],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent {
  constructor(private route: ActivatedRoute, private productService: ProductSericeService) { }

  id: any = ""
  product: any = {}

  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.product = await this.productService.getProduct(this.id);
    }
  }

}

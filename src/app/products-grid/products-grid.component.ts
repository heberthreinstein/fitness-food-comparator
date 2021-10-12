import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products-grid',
  templateUrl: './products-grid.component.html',
  styleUrls: ['./products-grid.component.scss']
})
export class ProductsGridComponent implements OnInit {

  products: any;

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.products = this.productsService.getAllProducts();
  }

}

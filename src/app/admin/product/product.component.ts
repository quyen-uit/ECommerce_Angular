

import { Component, OnInit } from '@angular/core';
import { DynamicColumn } from 'src/app/shared/models/common/dynamicColumn';



export interface Product {
  id: number;
  name: string;
  price: number;
  createdAt: Date;
  inStock: boolean;
}



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  title = 'PRODUCT.MANAGEMENT';
  productColumns: DynamicColumn[] = [
    { key: 'name', label: 'Product Name', type: 'text', visible: true, sortable: true, filterable: true },
    { key: 'brand', label: 'Brand', type: 'text', visible: true, sortable: true, filterable: true },
    { key: 'price', label: 'Price', type: 'number', visible: true, sortable: true, filterable: true },
    { key: 'available', label: 'Available', type: 'bool', visible: true, sortable: false, filterable: true },
    { key: 'created', label: 'Created Date', type: 'date', visible: true, sortable: true, filterable: true },
  ];

  productData = [
    {
      name: 'Laptop',
      brand: 'Dell',
      price: 1200,
      available: true,
      created: new Date('2024-01-01'),
    },
    {
      name: 'Phone',
      brand: 'Samsung',
      price: 800,
      available: false,
      created: new Date('2024-03-15'),
    },
    {
      name: 'Laptop',
      brand: 'Dell',
      price: 1200,
      available: true,
      created: new Date('2024-01-01'),
    },
    {
      name: 'Phone',
      brand: 'Samsung',
      price: 800,
      available: false,
      created: new Date('2024-03-15'),
    },
    {
      name: 'Laptop',
      brand: 'Dell',
      price: 1200,
      available: true,
      created: new Date('2024-01-01'),
    },
    {
      name: 'Phone',
      brand: 'Samsung',
      price: 800,
      available: false,
      created: new Date('2024-03-15'),
    },
    {
      name: 'Laptop',
      brand: 'Dell',
      price: 1200,
      available: true,
      created: new Date('2024-01-01'),
    },
    {
      name: 'Phone',
      brand: 'Samsung',
      price: 800,
      available: false,
      created: new Date('2024-03-15'),
    },
    {
      name: 'Laptop',
      brand: 'Dell',
      price: 1200,
      available: true,
      created: new Date('2024-01-01'),
    },
    {
      name: 'Phone',
      brand: 'Samsung',
      price: 800,
      available: false,
      created: new Date('2024-03-15'),
    },

  ];



  onAddProduct() {
    console.log('Add product');
  }



  onEditProduct(product: any) {
    console.log('Edit product:', product);
  }



  onDeleteProduct(product: any) {
    console.log('Delete product:', product);
  }
}

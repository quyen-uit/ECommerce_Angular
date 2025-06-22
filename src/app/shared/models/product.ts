import { ProductSize } from "../enums/productSize";

export interface CreateProduct {
  name: string;
  description: string;
  price: number;
  photoUrl: string;
  categoryId: number;
  productBrandId: number;
  isNew: boolean;
  isTrending: boolean;
  productSize: ProductSize;
  productType: string;
  productBrand: string;
}

export interface Product extends CreateProduct {
  id: number
}
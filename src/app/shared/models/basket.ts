import * as cuid from "cuid"

export interface Basket {
    id: string;
    items: BasketItem[];
    deliveryMethodId?: number;
    clientSecret?: string;
    paymentIntentId?: string;
    shippingPrice: number;
}

export interface BasketItem {
    id: number;
    productName: string;
    price: number;
    quantity: number;
    photoUrl: string;
    brand: string;
    type: string;
}


export class Basket implements Basket {
    id = cuid();
    items: BasketItem[] = [];
    shippingPrice = 0;
}

export interface BasketTotal {
    subTotal: number,
    shippingPrice: number,
    total: number;
}
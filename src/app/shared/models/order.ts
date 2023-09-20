import { Address } from "./user";

export interface OrderToCreate {
    basketId: string;
    deliveryMethod: number;
    shipToAddress: Address;
}
export interface Order {
    id: number;
    buyerEmail: string;
    orderDate: string;
    shipToAddress: Address;
    deliveryMethod: string;
    shippingPrice: number;
    subtotal: number;
    total: number;
    status: string;
    paymentIntentId: string;
    orderItems: OrderItem[];
}

export interface OrderItem {
    productId: number;
    productName: string;
    photoUrl: string;
    price: number;
    quantity: number;
}
 
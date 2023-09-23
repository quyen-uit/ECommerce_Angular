import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/models/order';
import { OrderService } from '../order.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService) { }
  ngOnInit(): void {
    this.initOrders();
  }

  initOrders() {
    this.orderService.getOrders().subscribe({
      next: orders => this.orders = orders
    })
  }
}

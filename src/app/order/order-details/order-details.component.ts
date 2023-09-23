import { Component, OnInit } from '@angular/core';
import { BasketItem } from 'src/app/shared/models/basket';
import { Order } from 'src/app/shared/models/order';
import { OrderService } from '../order.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  order?: Order;

  constructor(private orderService: OrderService, private activatedRoute: ActivatedRoute, private bcService: BreadcrumbService) { }
  ngOnInit(): void {
    this.initOrder();
  }

  initOrder() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    id && this.orderService.getOrderById(+id).subscribe({
      next: order => {
        this.order = order;
        this.bcService.set('@orderId', `Order ${+id} - ${order.status}`);
      }
    })
  }
}

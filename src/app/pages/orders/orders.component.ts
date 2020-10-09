import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderListModel } from 'src/app/models/order/order-list.model';
import { OrderFilterModel } from 'src/app/models/order/order-filter.model';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  page = 1;
  limit = 20;
  orderFilter = new OrderFilterModel();

  observerIndex$: Subscription;
  
  displayedColumns: string[] = Object.keys(new OrderListModel());
  dataSource = new MatTableDataSource<OrderListModel[]>();

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.getOrders();
  }

  ngOnDestroy(): void {
    this.observerIndex$ && this.observerIndex$.unsubscribe();
  }

  getOrders() {
    this.observerIndex$ = this.orderService.index(this.page, this.limit, this.orderFilter)
      .subscribe(( data ) => {
        this.dataSource = data;
        // console.log(Object.keys(new OrderListModel()), this.dataSource)
    }, err => {});
  }

}

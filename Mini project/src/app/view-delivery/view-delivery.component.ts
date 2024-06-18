import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeliveryService, Delivery } from '../delivery.service';

@Component({
  selector: 'app-view-delivery',
  templateUrl: './view-delivery.component.html',
  styleUrls: ['./view-delivery.component.css']
})
export class ViewDeliveryComponent implements OnInit {
  deliveries: Delivery[] = [];

  constructor(private deliveryService: DeliveryService, private router: Router) { }

  ngOnInit(): void {
    this.fetchDeliveries();
  }

  fetchDeliveries(): void {
    this.deliveryService.getDeliveries().subscribe(
      (data: Delivery[]) => {
        this.deliveries = data;
      },
      (error) => {
        console.error('Error fetching deliveries:', error);
      }
    );
  }

  proceedToPayment(delivery: Delivery): void {
    // Navigate to payment component and pass delivery data as state
    this.router.navigate(['/payment'], { state: { delivery } });
  }
}

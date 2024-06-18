import { Component, OnInit } from '@angular/core';
import { DeliveryService } from '../delivery.service';
import { AdminAuthService } from '../admin-auth.service'; // Create this service for admin authentication

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  deliveries: any[] = [];
  selectedDelivery: any;
  isLoggedIn: boolean = false; // Flag to track login state
  username: string = '';
  password: string = '';

  constructor(private deliveryService: DeliveryService, private authService: AdminAuthService) { }

  ngOnInit(): void {
    // Check if already logged in (optional)
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.loadDeliveries();
    }
  }

  login() {
    this.authService.login(this.username, this.password).subscribe(
      (success) => {
        this.isLoggedIn = true;
        this.loadDeliveries();
      },
      (error) => {
        console.error('Login failed:', error);
        // Handle login error (e.g., show error message)
      }
    );
  }

  loadDeliveries() {
    this.deliveryService.getDeliveries().subscribe(data => {
      this.deliveries = data;
    });
  }

  deleteDelivery(id: string) {
    this.deliveryService.deleteDelivery(id).subscribe(() => {
      this.loadDeliveries();
    });
  }

  editDelivery(delivery: any) {
    this.selectedDelivery = { ...delivery };
  }

  updateDelivery() {
    if (this.selectedDelivery && this.selectedDelivery._id) {
      this.deliveryService.updateDelivery(this.selectedDelivery._id, this.selectedDelivery).subscribe(() => {
        this.loadDeliveries();
        this.selectedDelivery = null;
      });
    }
  }
}

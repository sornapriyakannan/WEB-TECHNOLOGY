import { Component, PACKAGE_ROOT_URL } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-add-delivery',
  templateUrl: './add-delivery.component.html',
  styleUrls: ['./add-delivery.component.css']
})
export class AddDeliveryComponent {
  delivery = {
    name: '',
    sender_name: '',
    sender_address: '',
    receiver_name: '',
    receiver_address: '',
    packagename: '',
    package_description: '',
    package_weight: 0,
    package_length: 0,
    package_width: 0,
    package_height: 0,
    service_type: 'standard',
    price: 150,
    phone_number: '',
    otp: ''
  };
  phoneNumberVerified = false;
  otpVerified = false;
  submitted = false;
  error: string = '';

  constructor(private http: HttpClient) {}

  calculatePrice() {
  
  }

  verifyPhoneNumber() {
    // Your existing verifyPhoneNumber function
    this.phoneNumberVerified = true;
  }

  verifyOTP() {
    // Your existing verifyOTP function
    this.otpVerified = true;

  }

  onSubmit() {
  this.http.post<any>('http://localhost:3000/adddelivery', this.delivery)
    .pipe(
      catchError(error => {
        this.error = error.message || 'An error occurred while adding delivery.';
        return throwError(this.error);
      })
    )
    .subscribe({
      next: (response) => {
        console.log('Delivery added:', response);
        this.submitted = true;
        this.resetForm();
      },
      error: (error) => {
        console.error('Error adding delivery:', error);
      }
    });
}

  resetForm() {
    this.delivery = {
      name: '',
      sender_name: '',
      sender_address: '',
      receiver_name: '',
      receiver_address: '',
      packagename: '',
      package_description: '',
      package_weight: 0,
      package_length: 0,
      package_width: 0,
      package_height: 0,
      service_type: 'standard',
      price: 0,
      phone_number: '',
      otp: ''
    };
    this.phoneNumberVerified = false;
    this.otpVerified = false;
    setTimeout(() => {
      this.submitted = false;
      this.error = '';
    }, 3000);
  }
}

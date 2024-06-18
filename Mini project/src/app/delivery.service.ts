import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Delivery {
    status: any;
    _id: string;
    name: string;
    sender_name: string;
    sender_address: string;
    receiver_name: string;
    receiver_address: string;
    packagename: string;
    package_description: string;
    package_weight: number;
    package_length: number;
    package_width: number;
    package_height: number;
    service_type: string;
    price: number;
    phone_number: string;
    otp: string;
}

@Injectable({
    providedIn: 'root'
})
export class DeliveryService {
    private apiUrl = 'http://localhost:3000/deliveries'; // Adjust if your API is running on a different port

    constructor(private http: HttpClient) { }

    getDeliveries(): Observable<Delivery[]> {
        return this.http.get<Delivery[]>(this.apiUrl);
    }
    deleteDelivery(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/deletedelivery/${id}`);
      }
    
      updateDelivery(id: string, data: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/updatedelivery/${id}`, data);
      }
}

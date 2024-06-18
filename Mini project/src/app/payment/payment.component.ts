import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {GooglePayButtonModule} from '@google-pay/button-angular';
import { Delivery } from '../delivery.service';import { ActivatedRoute } from '@angular/router';


@Component({
  standalone: true,
  imports: [GooglePayButtonModule],
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {
  constructor(private router: Router) { }
  delivery: Delivery | undefined;

  ngOnInit(): void {
    this.delivery = history.state.delivery;
  
  }
   navigateToOrders(): void {
    this.router.navigate(['/orders']);
  }
  buttonWidth = 240
  
  paymentRequest : google.payments.api.PaymentDataRequest ={

    apiVersion: 2,
    
    apiVersionMinor: 0,
    
    allowedPaymentMethods: [
    
    
    {
    
    type: 'CARD',
    parameters: {
    
    allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
    
    allowedCardNetworks: ["AMEX", "VISA", "MASTERCARD"]
    
    },
    tokenizationSpecification:{
    type: "PAYMENT_GATEWAY",
    parameters: {
    gateway: "example",
    gatewayMerchantId: "exampleGatewayMerchantId"
      }
    }
  }
  ],
  merchantInfo: {

    merchantId: "12345678901234567890",
    
    merchantName: "Demo Merchant"
    
    },
    transactionInfo: {

      totalPriceStatus: "FINAL",
      
      totalPriceLabel: "Total",
      
      totalPrice: "100.00",
      
      currencyCode: "USD",
      
      countryCode: "US"
      
}
}
onLoadPaymentData(event:any){
console.log(event,">>Data");
}
}

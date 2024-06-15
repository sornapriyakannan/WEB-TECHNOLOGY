import { Component } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  products = [
    {
      id: 1,
      name: 'IphoneI12',
      price: 50000,
      imageUrl: 'assets/phone.jpg',
      description:
        ' Sleek, powerful smartphone with advanced camera and cutting-edge features.',
    },
    {
      id: 2,
      name: 'Grinder',
      price: 3000,
      imageUrl: 'assets/grinder.webp',
      description:
        'Preethi Grinder, 3 jars, multi-purpose, 500W motor, stainless steel.',
    },
    {
      id: 3,
      name: 'Mixer',
      price: 2000,
      imageUrl: 'assets/mixer.jpg',
      description: 'Bajaj Mixer, 3-speed control, 2 jars, 500W, durable build.',
    },
    {
      id: 4,
      name: 'Backpack',
      price: 500,
      imageUrl: 'assets/bag.jpg',
      description:
        'Durable, spacious backpack designed for comfort and convenience on the go.',
    },
    {
      id: 5,
      name: 'Bracelet',
      price: 100,
      imageUrl: 'assets/bracelet.jpg',
      description: ' Stylish, elegant bracelet perfect for any occasion.',
    },
    {
      id: 6,
      name: 'Mobile Case',
      price: 200,
      imageUrl: 'assets/mobilecase.jpg',
      description:
        'Spigen mobile case, designed for iPhone 12, shock-absorbent, sleek design.',
    },
  ];

  cart: any[] = [];

  addToCart(product: any) {
    this.cart.push(product);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  buyNow(product: any) {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push({ ...product, status: 'Pending' });
    localStorage.setItem('orders', JSON.stringify(orders));
    this.addToCart(product);
  }
}
import { Component } from '@angular/core';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent {
  fromCompany: string;
  fromAddress: string;
  toCompany: string;
  toAddress: string;
  reference: string;
  dateSent: string;
  dateDue: string;
  products: Product[];
  subtotal: number;
  tax: number;
  total: number;
  notes: string;
  terms: string;
  previewMode: boolean;

  constructor() {
    this.fromCompany = '';
    this.fromAddress = '';
    this.toCompany = '';
    this.toAddress = '';
    this.reference = '';
    this.dateSent = '';
    this.dateDue = '';
    this.products = [{
      description: '',
      quantity: 1,
      price: 0,
      amount: 0
    }];
    this.subtotal = 0;
    this.tax = 0;
    this.total = 0;
    this.notes = '';
    this.terms = '';
    this.previewMode = false;
  }

  

  productPriceChange(product: Product) {
    const indexOf = this.products.indexOf(product);

    this.products[indexOf].amount = this.products[indexOf].price * this.products[indexOf].quantity;

    this.subtotal = 0;
    this.tax = 0;
    this.total = 0;

    for (let i = 0; i < this.products.length; i++) {
      this.subtotal += this.products[i].amount;
      this.tax = +((this.subtotal / 100) * 20).toFixed(2);
      this.total = +(this.subtotal + this.tax).toFixed(2);
    }
  }

  removeProduct(product: Product) {
    const indexOf = this.products.indexOf(product);

    if (indexOf !== -1) {
      this.products.splice(indexOf, 1);
    }
  }

  addBlankProduct() {
    this.products.push({
      description: '',
      quantity: 1,
      price: 0,
      amount: 0
    });
  }
}

interface Product {
  description: string;
  quantity: number;
  price: number;
  amount: number;
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Enrich } from "./enrich/enrich";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [MatIconModule, MatButtonModule, CommonModule, FormsModule, ReactiveFormsModule, Enrich, MatProgressSpinner],
  templateUrl: './app.html',
  styleUrls: ['./app.scss', './form.scss', './modal.scss']
})
export class App implements OnInit {
  protected title = 'elvix-demo';

  public oaiToken = new FormControl('', [Validators.required, Validators.minLength(50)]);

  public setOAIToken(): void {
    localStorage.setItem('gpt-token', this.oaiToken.value!);
    this.showModal = false;
  }

  public ngOnInit(): void {
    // localStorage.removeItem('elvix');
    if (!localStorage.getItem('elvix')) {
      localStorage.setItem('elvix', JSON.stringify([]));
    }

    if (localStorage.getItem('gpt-token')) {
      this.showModal = false;
    }
  }

  // CASE 1
  public email1 = 'email@mail.com';
  public phone1 = '+420442655439';
  public message1 = 'Hi! I really want this SD card, but the price is too much for me at the moment.\nCould i get a 30% discount?';

  public showModal = true;

  // CASE 2
  public willStock = false;
  public willAction = false;
  public belowPrice = '190';
  public email2 = 'email@mail.com';

  // CASE 3
  public message3 = 'Hi! I would like to buy a cover for my tesla screen, but can\'t find one for Model Y Juniper. Please consider adding them to your stock.\nAll-in-One Central Screen Tempered Glass & Frame Cover for Tesla Model Y Juniper 2025+\nhttps://teslaunch.net/products/all-in-one-central-screen-tempered-glass-frame-cover-for-tesla-model-y-juniper';
  public email3 = 'email@mail.com';

  navItems = [
    'Camera systems',
    'Smart home',
    'Charging electric cars',
    'Accessories for Tesla',
    'Solar lights and lanterns',
    'Domestic energy',
    'Home videophones',
  ];

  public step2 = false;

  showCase1 = false;
  showCase2 = false;
  showCase3 = false;

  goBack1(event: any): void {
    this.step2 = false;
    console.log('app')
  }

  toggleCase1(value: boolean): void {
    this.showCase1 = value;

    if (!value) {
      const items: any[] = JSON.parse(localStorage.getItem('elvix')!) || [];

      items.push({
        case: 1,
        shop: 'Elvix',
        sku: '11549',
        product: 'Kingston 128GB SD card',

        email: this.email1,
        phone: this.phone1,
        message: this.message1,

        onStock: true,
        priceDrop: true,
        priceUnder: 250.00,
        hasPromotion: false,
      });

      localStorage.removeItem('elvix');
      localStorage.setItem('elvix', JSON.stringify(items));
      this.step2 = true;
    }
  }

  toggleCase2(value: boolean): void {
    this.showCase2 = value;

    if (!value) {
      const items: any[] = JSON.parse(localStorage.getItem('elvix')!) || [];

      items.push({
        case: 2,
        shop: 'Elvix',
        sku: '11549',
        product: 'Kingston 128GB SD card',

        email: this.email2,
        willBeOnStock: this.willStock,
        willBeInSale: this.willAction,
        priceDropTo: this.belowPrice,

        onStock: true,
        sellable: true,
        currentPrice: 250.00,
        hasPromotion: false,
      });

      localStorage.removeItem('elvix');
      localStorage.setItem('elvix', JSON.stringify(items));
      this.step2 = true;
    }
  }

  toggleCase3(value: boolean): void {
    this.showCase3 = value;

    if (!value) {
      const items: any[] = JSON.parse(localStorage.getItem('elvix')!) || [];

      items.push({
        case: 3,
        shop: 'Elvix',
        refferingPage: 'Central Screen Tempered Glass & Frame Cover for Tesla Model Y Juniper',

        email: this.email3,
        message: this.message3
      });

      localStorage.removeItem('elvix');
      localStorage.setItem('elvix', JSON.stringify(items));
      this.step2 = true;
    }
  }

  categories = [
    'Camera systems',
    'Smart home',
    'Charging electric cars',
    'Accessories for Tesla',
    'Solar lights and lanterns',
    'Domestic energy',
    'Home videophones',
    'Smart pet care',
    'Brands',
  ];

  breadcrumbs = [
    'Camera systems',
    'Camera accessories',
    'Kingston 128GB SD card',
  ];
}

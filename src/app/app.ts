import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatIconModule, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss', './form.scss']
})
export class App {
  protected title = 'elvix-demo';

  navItems = [
    'Camera systems',
    'Smart home',
    'Charging electric cars',
    'Accessories for Tesla',
    'Solar lights and lanterns',
    'Domestic energy',
    'Home videophones',
  ];

  showCase1 = true;
  showCase2 = false;
  showCase3 = false;

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

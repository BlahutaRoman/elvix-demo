import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-enrich',
  imports: [MatIconModule, CommonModule, FormsModule],
  templateUrl: './enrich.html',
  styleUrls: ['./enrich.scss', '../app.scss']
})
export class Enrich implements OnInit {

  @Output()
  close = new EventEmitter<boolean>();

  request: any = undefined;

  hrefs = [
    'https://docs.google.com/spreadsheets/d/1LGLx7Var3O6PZz7ZQ2zg24086tvTNjTzUJuoqkcQs1I/edit?usp=sharing',
    'https://docs.google.com/spreadsheets/d/1rpRHO-a3bj-TZHFzYHiLVdMLXuoychPXsG8KV9sQbrQ/edit?usp=sharing',
    'https://docs.google.com/spreadsheets/d/1LYhUaVHleHXoFYLADZVezfZd-yXna7c3ggjXZhWrDjg/edit?usp=sharing',
  ];

  navItems = [
    'Camera systems',
    'Smart home',
    'Charging electric cars',
    'Accessories for Tesla',
    'Solar lights and lanterns',
    'Domestic energy',
    'Home videophones',
  ];

  public goBack(): void {
    this.close.emit(false);
    console.log('Enrich');
  }

  public ngOnInit(): void {
    const requests: any[] = JSON.parse(localStorage.getItem('elvix')!);
    this.request = requests[requests.length-1];
    console.log(this.request);
  }
}

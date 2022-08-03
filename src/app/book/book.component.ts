import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        transform: 'scaleX(1)',
        opacity: 1
      })),
      state('closed', style({
        transform: 'scaleX(-1)',
        opacity: 0.7
      })),
      transition('open => closed', [
        animate('1s ease-in')
      ]),
      transition('closed => open', [
        animate('1s ease-out')
      ]),
    ]),
  ],
})
export class BookComponent implements OnInit {
  isOpen = true;

  constructor() { }

  ngOnInit(): void {
    setInterval(() => {
      this.isOpen = !this.isOpen;
    }, 2000);
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }
}

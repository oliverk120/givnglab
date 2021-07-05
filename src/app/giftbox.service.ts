import { Injectable } from '@angular/core';
import { Gift } from './gift';

@Injectable({
  providedIn: 'root'
})
export class GiftboxService {
  gift?: Gift;
  giftbox: Gift[] = [];

  add(gift: Gift) {
    this.giftbox.push(gift);
  }

  clear() {
    this.giftbox = [];
  }
}

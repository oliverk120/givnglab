import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GiftboxService {
  giftbox: string[] = [];

  add(gift: string) {
    this.giftbox.push(gift);
  }

  clear() {
    this.giftbox = [];
  }
}

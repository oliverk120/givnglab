import { Injectable } from '@angular/core';
import { Gift } from './gift';
import { GIFTS } from './giftsDatabase';
import { Observable, of } from 'rxjs';
import { GiftboxService } from './giftbox.service';


@Injectable({
  providedIn: 'root'
})
export class GiftService {

  constructor(private giftboxService: GiftboxService) { }

getGifts(): Observable<Gift[]> {
  const gifts = of(GIFTS);
  this.giftboxService.add('added gifts');
  return gifts;
}

}

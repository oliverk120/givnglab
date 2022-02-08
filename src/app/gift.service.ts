import { Injectable } from '@angular/core';
import { Gift } from './gift';
import { ExternalGiftList } from './gift';
import { GIFTS } from './giftsDatabase';
import { GIFTSExt } from './GQBoyfriendGifts';
import { Observable, of } from 'rxjs';
import { GiftboxService } from './giftbox.service';


@Injectable({
  providedIn: 'root'
})
export class GiftService {

constructor(private giftboxService: GiftboxService) { }

getGifts(): Observable<Gift[]> {
  const gifts = of(GIFTS);
  return gifts;
}

getExtGifts(): Observable<ExternalGiftList[]> {
  const gifts = of(GIFTSExt);
  return gifts;
}


}

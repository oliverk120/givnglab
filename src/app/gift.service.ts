import { Injectable } from '@angular/core';
import { Gift } from './gift';
import { ExternalGiftList } from './gift';
import { GIFTSExt } from './GQBoyfriendGifts';
import { Observable, of } from 'rxjs';
import { GiftboxService } from './giftbox.service';


@Injectable({
  providedIn: 'root'
})
export class GiftService {

constructor(private giftboxService: GiftboxService) { }

getExtGifts(): Observable<ExternalGiftList[]> {
  const gifts = of(GIFTSExt);
  return gifts;
}


}

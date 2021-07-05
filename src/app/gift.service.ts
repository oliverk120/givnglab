import { Injectable } from '@angular/core';
import { Gift } from './gift';
import { GIFTS } from './giftsDatabase';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GiftService {

  constructor() { }

getGifts(): Observable<Gift[]> {
  const gifts = of(GIFTS);
  return gifts;
}

}

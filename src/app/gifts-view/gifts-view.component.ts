import { Component, OnInit } from '@angular/core';
import { Gift } from '../gift';
import { GiftService } from '../gift.service';
import { GiftboxService } from '../giftbox.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-gifts-view',
  templateUrl: './gifts-view.component.html',
  styleUrls: ['./gifts-view.component.css']
})
export class GiftsViewComponent implements OnInit {

      selectedGift?: Gift;
 gifts: Gift[] = [];


  constructor(  
    private route: ActivatedRoute,
    private router: Router,
    private giftService: GiftService,
    private giftboxService: GiftboxService
  ) { }


  ngOnInit(): void {
    this.getGifts();
  }
  
 onSelect(gift: Gift): void {
    this.selectedGift = gift;
    this.giftboxService.add(`Added gift=${gift.name}`);
  }

  getGifts(): void {
      this.giftService.getGifts()
      .subscribe(gifts => this.gifts = gifts);
  }

  recipient = this.route.snapshot.paramMap.get('recipient');
  giftsFilter = this.gifts;
  //giftsFilter = this.gifts.filter(item => item.recipient === this.recipient);


  
}

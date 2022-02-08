import { Component, OnInit } from '@angular/core';
import { Gift } from '../gift';
import { ExternalGiftList } from '../gift';
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
 extgiftslist: Gift[] = [];
 extgifts: ExternalGiftList[] = [];
 giftsShow: Gift[] = [];
 extGiftsShow: Gift[] = [];
 recipient: any = null; 

  page = 0;
  size = 2;

  constructor(  
    private route: ActivatedRoute,
    private router: Router,
    private giftService: GiftService,
    private giftboxService: GiftboxService
  ) { }


  ngOnInit(): void {
    this.getGifts({pageIndex: this.page, pageSize: this.size});
    this.getExtGifts({pageIndex: this.page, pageSize: this.size});
  }
  
 onSelect(gift: Gift): void {
    this.selectedGift = gift;
    this.giftboxService.add(gift);
  }

  getGifts(obj: {pageIndex: number, pageSize: number}) {
      
      this.giftService.getGifts()
      .subscribe(gifts => this.gifts = gifts);

   //   this.giftsExt = GIFTSExt;

      this.recipient = String(this.route.snapshot.paramMap.get('recipient'));

      if(this.recipient){
        this.gifts = this.gifts.filter(item => item.recipient === this.recipient)
      }

      let index=0,
        startingIndex=obj.pageIndex * obj.pageSize,
        endingIndex=startingIndex + obj.pageSize;

    this.giftsShow = this.gifts.filter(() => {
      index++;
      return (index > startingIndex && index <= endingIndex) ? true : false;
    });
  }

  getExtGifts(obj: {pageIndex: number, pageSize: number}) {
      
      this.giftService.getExtGifts()
      .subscribe(extgifts => this.extgifts = extgifts);
      console.log(this.extgifts[0].title);

   
      this.recipient = String(this.route.snapshot.paramMap.get('recipient'));
      
      if(this.recipient){
        this.extgifts = this.extgifts.filter(item => item.recipient === this.recipient)
      }

      // start actually listing the gifts from the object
      this.extgiftslist = this.extgifts[0].gifts;

      console.log(this.extgifts);
      let index=0,
        startingIndex=obj.pageIndex * obj.pageSize,
        endingIndex=startingIndex + obj.pageSize;

      this.extGiftsShow = this.extgiftslist.filter(() => {
        index++;
        return (index > startingIndex && index <= endingIndex) ? true : false;
      });
  
  }
    
}

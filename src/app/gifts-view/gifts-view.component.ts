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
 extGiftsShow: Gift[] = [];
 recipient: any = null; 

  page = 0;
  size = 500;

  constructor(  
    private route: ActivatedRoute,
    private router: Router,
    private giftService: GiftService,
    private giftboxService: GiftboxService
  ) { }


  ngOnInit(): void {
    this.getExtGifts({pageIndex: this.page, pageSize: this.size});
  }
  
 onSelect(gift: Gift): void {
    this.selectedGift = gift;
    this.giftboxService.add(gift);
  }

  getExtGifts(obj: {pageIndex: number, pageSize: number}) {
      
      this.giftService.getExtGifts()
      .subscribe(extgifts => this.extgifts = extgifts);
   
      this.recipient = String(this.route.snapshot.paramMap.get('recipient'));
      
        console.log(this.extgifts);


      //This filters out entire lists depending on whether the recipients match... consider eventually doing it at the individual gift level, but for now this is fine
      if(this.recipient){
        this.extgifts = this.extgifts.filter(item => item.recipient === this.recipient)
      }

      //This loop below creates the list of gifts 
      // THIS LOGIC SHOULD maybe? BE IN THE SERVICE _ I"LL FIX THAT LATER
      for (var i = 0; i < this.extgifts.length; i++) {
        //loop through each gifts in extgifts and add to extgiftslist
        for (var j = 0; j < this.extgifts[i].gifts.length; j++) {
          //add each gift to the extgiftlist
          this.extgiftslist.push(this.extgifts[i].gifts[j]);
        }
      }
      
      let index=0,
        startingIndex=obj.pageIndex * obj.pageSize,
        endingIndex=startingIndex + obj.pageSize;

      this.extGiftsShow = this.extgiftslist.filter(() => {
        index++;
        return (index > startingIndex && index <= endingIndex) ? true : false;
      });


  }
    
}

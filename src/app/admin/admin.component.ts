import { Component, OnInit } from '@angular/core';
import { Gift } from '../gift';
import { ExternalGiftList } from '../gift';
import { GiftService } from '../gift.service';
import { GiftboxService } from '../giftbox.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

 selectedGift?: Gift;
 gifts: Gift[] = [];
 extgiftslist: Gift[] = [];
 extgifts: ExternalGiftList[] = [];
 extGiftsShow: Gift[] = [];
 recipient: any = null; 
  page = 0;
  size = 500;
  displayedColumns: string[] = ['name', 'image_url', 'description', 'price'];
  //displayedColumns: string[] = ['price', 'name', 'brand', 'type', 'description', 'package', 'image_url', 'brandlogoUrl', 'source_info', 'pricetiers', 'add'];

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
      console.log(this.extGiftsShow);

  }

}

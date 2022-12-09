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
  // create an array that will store a list of gifts


constructor(private giftboxService: GiftboxService) { }

getExtGifts(): Observable<ExternalGiftList[]> {

      //This loop below creates the list of gifts and appends the tags from the source to each individual gift item
      for (var i = 0; i < GIFTSExt.length; i++) {
        //loop through each gifts in extgifts and add to extgiftslist
        for (var j = 0; j < GIFTSExt[i].gifts.length; j++) {
          //add the following properties to each gift in extgifts including title
          // create a variable called source_info that includes all data from the current extgifts except for the gift property
          var source_info = {
            title: GIFTSExt[i].title,
            source_url: GIFTSExt[i].source_url,
            source_name: GIFTSExt[i].source_name,
            source_logo_url: GIFTSExt[i].source_logo_url,
            tags: GIFTSExt[i].tags,
            recipient: GIFTSExt[i].recipient,
            date: GIFTSExt[i].date,
            gifts: 'n/a'
          }
          //add source info to each gift
          GIFTSExt[i].gifts[j].source_info = source_info;
        }
      }
      

  const gifts = of(GIFTSExt);
  return gifts;



}


}

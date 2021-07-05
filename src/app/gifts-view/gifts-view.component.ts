import { Component, OnInit } from '@angular/core';
import { GIFTS } from '../giftsDatabase';
import { Gift } from '../gift';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-gifts-view',
  templateUrl: './gifts-view.component.html',
  styleUrls: ['./gifts-view.component.css']
})
export class GiftsViewComponent implements OnInit {

  constructor(  
    private route: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit(): void {
  }
  
  recipient = this.route.snapshot.paramMap.get('recipient');
  giftsFilter = GIFTS.filter(item => item.recipient === this.recipient);

  selectedGift?: Gift;
  onSelect(gift: Gift): void {
    this.selectedGift = gift;
  }
}

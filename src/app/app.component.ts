import { Component } from '@angular/core';
import { GIFTS } from './giftsDatabase';
import { GiftboxService } from './giftbox.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(  
    public giftboxService: GiftboxService
  ) {}
}

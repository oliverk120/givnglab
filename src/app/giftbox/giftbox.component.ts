import { Component, OnInit } from '@angular/core';
import { GiftboxService } from '../giftbox.service';

@Component({
  selector: 'app-giftbox',
  templateUrl: './giftbox.component.html',
  styleUrls: ['./giftbox.component.css']
})
export class GiftboxComponent implements OnInit {

  constructor(public giftboxService: GiftboxService) { }

  ngOnInit(): void {
  }

}

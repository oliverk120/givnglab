import { Component, OnInit } from '@angular/core';
import { GIFTS } from '../giftsDatabase';

@Component({
  selector: 'app-gifts-view',
  templateUrl: './gifts-view.component.html',
  styleUrls: ['./gifts-view.component.css']
})
export class GiftsViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  gifts = GIFTS;
}

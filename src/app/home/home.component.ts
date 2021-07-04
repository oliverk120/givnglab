import { Component, OnInit } from '@angular/core';
import { GIFTS } from '../giftsDatabase';

interface Recipient {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

    title = 'GivngLAB';
  recipients: Recipient[] = [
    {value: 'mother', viewValue: 'Mother'},
    {value: 'brothers', viewValue: 'Brothers'},
    {value: 'baby daughter', viewValue: 'Baby Daughter'},
    {value: 'wife', viewValue: 'Wife'}
  ];
  panelOpenState = false;
  gifts = GIFTS;
  selectedRecipient = '';

}

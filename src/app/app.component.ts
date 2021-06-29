import { Component } from '@angular/core';
import { GIFTS } from './giftsDatabase';

interface Recipient {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GivngLAB';
  recipients: Recipient[] = [
    {value: 'mother', viewValue: 'Mother'},
    {value: 'brothers', viewValue: 'Brothers'},
    {value: 'baby daughter', viewValue: 'Baby Daughter'},
    {value: 'wife', viewValue: 'Wife'}
  ];
  panelOpenState = false;
  gifts = GIFTS;
}

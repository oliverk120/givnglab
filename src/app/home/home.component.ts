import { Component, OnInit } from '@angular/core';

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
    {value: 'boyfriend', viewValue: 'Boyfriend'},
    {value: 'mother', viewValue: 'Mother'},
    {value: 'sister', viewValue: 'Sister'},
    {value: 'brother', viewValue: 'Brother'},
  ];
  panelOpenState = false;
  selectedRecipient = '';

}

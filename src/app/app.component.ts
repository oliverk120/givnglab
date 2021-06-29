import { Component } from '@angular/core';

interface Food {
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
  foods: Food[] = [
    {value: 'mother', viewValue: 'Mother'},
    {value: 'brothers', viewValue: 'Brothers'},
    {value: 'baby daughter', viewValue: 'Baby Daughter'},
    {value: 'wife', viewValue: 'Wife'}
  ];
  panelOpenState = false;
}

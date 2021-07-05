import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule} from '@angular/material/select';
import { MatExpansionModule} from '@angular/material/expansion'; 
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatGridListModule} from '@angular/material/grid-list'; 
import { MatToolbarModule} from '@angular/material/toolbar'; 
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';

import { GiftsViewComponent } from './gifts-view/gifts-view.component';
import { HomeComponent } from './home/home.component';
import { GiftboxComponent } from './giftbox/giftbox.component'; 

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSliderModule,
    MatSelectModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatGridListModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ],
  declarations: [
    AppComponent,
    GiftsViewComponent,
    HomeComponent,
    GiftboxComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule} from '@angular/material/select';
import { MatExpansionModule} from '@angular/material/expansion'; 
import { MatCheckboxModule} from '@angular/material/checkbox';
import { GiftsViewComponent } from './gifts-view/gifts-view.component';
import { HomeComponent } from './home/home.component'; 

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'gifts-view', component: GiftsViewComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    GiftsViewComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserAnimationsModule,
    MatSliderModule,
    MatSelectModule,
    MatExpansionModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

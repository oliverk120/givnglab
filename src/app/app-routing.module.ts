import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GiftsViewComponent } from './gifts-view/gifts-view.component';
import { HomeComponent } from './home/home.component'; 

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'gifts-view/:recipient', component: GiftsViewComponent },
  { path: 'gifts-view', component: GiftsViewComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}

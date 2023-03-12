import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainHomePageRoutingModule } from './main-home-routing.module';

import { MainHomePage } from './main-home.page';

import { NewsSearchComponent } from '../news-search/news-search.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainHomePageRoutingModule
  ],
  declarations: [MainHomePage, NewsSearchComponent]
})
export class MainHomePageModule {}

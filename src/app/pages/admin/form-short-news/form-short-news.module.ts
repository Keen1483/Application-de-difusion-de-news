import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormShortNewsPageRoutingModule } from './form-short-news-routing.module';

import { FormShortNewsPage } from './form-short-news.page';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormShortNewsPageRoutingModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ],
  declarations: [FormShortNewsPage]
})
export class FormShortNewsPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdPreviewPageRoutingModule } from './ad-preview-routing.module';

import { AdPreviewPage } from './ad-preview.page';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdPreviewPageRoutingModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ],
  declarations: [AdPreviewPage]
})
export class AdPreviewPageModule {}

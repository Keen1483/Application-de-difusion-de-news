import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../../../services/auth-guard.service';

import { PartnerFormPage } from './partner-form.page';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardService],
    component: PartnerFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartnerFormPageRoutingModule {}

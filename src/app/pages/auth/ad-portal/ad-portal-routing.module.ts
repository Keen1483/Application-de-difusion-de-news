import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../../../services/auth-guard.service';

import { AdPortalPage } from './ad-portal.page';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardService],
    component: AdPortalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdPortalPageRoutingModule {}

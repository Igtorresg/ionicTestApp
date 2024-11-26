import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WhiskyPage } from './whisky.page';

const routes: Routes = [
  {
    path: '',
    component: WhiskyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WhiskyPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VinoPage } from './vino.page';

const routes: Routes = [
  {
    path: '',
    component: VinoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VinoPageRoutingModule {}

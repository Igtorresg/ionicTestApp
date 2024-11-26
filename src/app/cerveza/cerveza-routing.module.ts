import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CervezaPage } from './cerveza.page';

const routes: Routes = [
  {
    path: '',
    component: CervezaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CervezaPageRoutingModule {}

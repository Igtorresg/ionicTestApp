import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriavinoPage } from './categoriavino.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriavinoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriavinoPageRoutingModule {}

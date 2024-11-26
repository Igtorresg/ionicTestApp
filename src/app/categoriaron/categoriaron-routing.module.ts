import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriaronPage } from './categoriaron.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriaronPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriaronPageRoutingModule {}

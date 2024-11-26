import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriawhiskyPage } from './categoriawhisky.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriawhiskyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriawhiskyPageRoutingModule {}

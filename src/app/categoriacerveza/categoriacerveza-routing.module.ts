import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriacervezaPage } from './categoriacerveza.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriacervezaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriacervezaPageRoutingModule {}

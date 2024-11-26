import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Instructivo2Page } from './instructivo2.page';

const routes: Routes = [
  {
    path: '',
    component: Instructivo2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Instructivo2PageRoutingModule {}

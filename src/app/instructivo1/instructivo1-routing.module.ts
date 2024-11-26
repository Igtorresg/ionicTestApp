import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Instructivo1Page } from './instructivo1.page';

const routes: Routes = [
  {
    path: '',
    component: Instructivo1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Instructivo1PageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Instructivo3Page } from './instructivo3.page';

const routes: Routes = [
  {
    path: '',
    component: Instructivo3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Instructivo3PageRoutingModule {}

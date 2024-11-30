import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FpassPage } from './fpass.page';

const routes: Routes = [
  {
    path: '',
    component: FpassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FpassPageRoutingModule {}

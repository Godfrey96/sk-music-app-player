import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MusicDetailsPage } from './music-details.page';

const routes: Routes = [
  {
    path: '',
    component: MusicDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MusicDetailsPageRoutingModule {}

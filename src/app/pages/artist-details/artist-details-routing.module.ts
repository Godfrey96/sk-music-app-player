import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArtistDetailsPage } from './artist-details.page';

const routes: Routes = [
  {
    path: '',
    component: ArtistDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArtistDetailsPageRoutingModule {}

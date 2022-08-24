import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArtistDetailsPageRoutingModule } from './artist-details-routing.module';

import { ArtistDetailsPage } from './artist-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArtistDetailsPageRoutingModule
  ],
  declarations: [ArtistDetailsPage]
})
export class ArtistDetailsPageModule {}

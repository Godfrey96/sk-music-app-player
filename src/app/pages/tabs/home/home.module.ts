import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';
import { SwiperModule } from 'swiper/angular';

import { HomePage } from './home.page';
import { TrendsComponent } from 'src/app/components/trends/trends.component';
import { ArtistsComponent } from 'src/app/components/artists/artists.component';
import { SongsComponent } from 'src/app/components/songs/songs.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SwiperModule
  ],
  declarations: [
    HomePage,
    TrendsComponent,
    ArtistsComponent,
    SongsComponent
  ]
})
export class HomePageModule { }

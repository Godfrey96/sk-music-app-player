import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'song-details/:id',
    loadChildren: () => import('./pages/music-details/music-details.module').then(m => m.MusicDetailsPageModule)
  },
  {
    path: 'playing',
    loadChildren: () => import('./pages/playing/playing.module').then(m => m.PlayingPageModule)
  },
  {
    path: 'album-details/:id',
    loadChildren: () => import('./pages/album-details/album-details.module').then(m => m.AlbumDetailsPageModule)
  },
  {
    path: 'artist-details/:id',
    loadChildren: () => import('./pages/artist-details/artist-details.module').then(m => m.ArtistDetailsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

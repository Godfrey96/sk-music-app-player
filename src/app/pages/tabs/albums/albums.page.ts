import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Album } from 'src/app/models/album.model';
import { AlbumService } from 'src/app/services/album/album.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.page.html',
  styleUrls: ['./albums.page.scss'],
})
export class AlbumsPage implements OnInit, OnDestroy {

  albums: Album[] = [];
  endsub$: Subject<any> = new Subject();

  constructor(
    private albumService: AlbumService
  ) { }

  ngOnInit() {
    this._getAlbums();
  }

  private _getAlbums() {
    this.albumService.getAllAlbums().pipe(
      takeUntil(this.endsub$)).subscribe((albums) => {
        this.albums = albums;
        console.log('albums: ', albums);
      });
  }

  ngOnDestroy() {
    this.endsub$.next('');
    this.endsub$.complete();
  }

}

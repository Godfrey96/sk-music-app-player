import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Artist } from 'src/app/models/artist.model';
import { Song } from 'src/app/models/song.model';
import { ArtistService } from 'src/app/services/artist/artist.service';
import { SongService } from 'src/app/services/song/song.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  featuredSongs: Song[] = [];
  newSongs: Song[] = [];
  songs: Song[] = [];
  artists: Artist[] = [];
  endsub$: Subject<any> = new Subject();

  constructor(
    private artistService: ArtistService,
    private songService: SongService,
  ) { }

  ngOnInit() {
    this._getArtists();
    this._getSongs();
    this._getFeaturedSongs();
    this._getNewSongs();
  }

  private _getArtists() {
    this.artistService.getAllArtists().subscribe((artists) => {
      this.artists = artists;
      console.log('artists: ', artists);
    });
  }

  private _getSongs() {
    this.songService.getAllSongs().pipe(
      takeUntil(this.endsub$)).subscribe(songs => {
        this.songs = songs;
        console.log('songs: ', songs);
      });
  }

  private _getNewSongs() {
    this.songService.getAllNewSongs(20).pipe(
      takeUntil(this.endsub$)).subscribe((newSongs) => {
        this.newSongs = newSongs;
        console.log('newSongs: ', newSongs);
      });
  }

  private _getFeaturedSongs() {
    this.songService.getAllFeaturedSongs(20).pipe(
      takeUntil(this.endsub$)).subscribe((featuredSongs) => {
        this.featuredSongs = featuredSongs;
        console.log('featuredSongs: ', featuredSongs);
      });
  }

  ngOnDestroy() {
    this.endsub$.next('');
    this.endsub$.complete();
  }

}


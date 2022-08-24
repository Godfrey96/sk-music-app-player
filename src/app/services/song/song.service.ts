import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Song } from 'src/app/models/song.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  apiUrlSongs = environment.apiURL + 'songs';

  constructor(private http: HttpClient) { }

  getAllSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(`${this.apiUrlSongs}`);
  }

  getAllFeaturedSongs(count: number): Observable<Song[]> {
    return this.http.get<Song[]>(`${this.apiUrlSongs}/featuredsongs/${count}`);
  }

  getAllNewSongs(count: number): Observable<Song[]> {
    return this.http.get<Song[]>(`${this.apiUrlSongs}/newsongs/${count}`);
  }

  // get single artist
  getSingleSong(songId: any): Observable<Song> {
    return this.http.get<Song>(`${this.apiUrlSongs}/${songId}`);
  }

  // search songs
  searchSongs(data: any): Observable<Song> {
    return this.http.get<Song>(`${this.apiUrlSongs}/searchsongs/` + data);
  }

  // get song by artist
  getSongByArtist(artistId: any): Observable<Song> {
    return this.http.get<Song>(`${this.apiUrlSongs}/get/song-by-artist/${artistId}`);
  }

  // get song by album
  getSongByAlbum(albumId: any): Observable<Song> {
    return this.http.get<Song>(`${this.apiUrlSongs}/get/song-by-album/${albumId}`);
  }

}

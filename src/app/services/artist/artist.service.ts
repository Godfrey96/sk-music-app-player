import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Artist } from 'src/app/models/artist.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  apiUrlArtists = environment.apiURL + 'artists';

  constructor(private http: HttpClient) { }

  // get all artists
  getAllArtists(): Observable<Artist[]> {
    return this.http.get<Artist[]>(`${this.apiUrlArtists}`);
  }

  // get single artist
  getSingleArtist(artistId: any): Observable<Artist> {
    return this.http.get<Artist>(`${this.apiUrlArtists}/${artistId}`);
  }

}

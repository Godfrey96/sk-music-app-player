import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Album } from 'src/app/models/album.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  apiUrlAlbums = environment.apiURL + 'albums';

  constructor(private http: HttpClient) { }

  getAllAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(`${this.apiUrlAlbums}`);
  }

  // get album artist
  getSingleAlbum(albumId: any): Observable<Album> {
    return this.http.get<Album>(`${this.apiUrlAlbums}/${albumId}`);
  }
}

import { Album } from "./album.model";
import { Artist } from "./artist.model";

export class Song {
    id?: string;
    title?: string;
    uploadedDate?: any;
    isFeatured?: boolean;
    image?: any;
    audio?: any;
    artist?: Artist;
    album?: Album;
    search?: any;
}

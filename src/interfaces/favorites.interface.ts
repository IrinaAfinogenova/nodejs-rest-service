import { Album } from './albums.interface';
import { Track } from './tracks.interface';
import { Artist } from './artists.interface';

export interface FavoritesCollection {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

export interface Favorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}

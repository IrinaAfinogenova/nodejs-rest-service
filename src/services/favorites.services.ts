import { v4 as uuidv4 } from 'uuid';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import {
  Favorites,
  FavoritesCollection,
} from '../interfaces/favorites.interface';
import { ArtistsService } from '../services/artists.services';
import { AlbumsService } from '../services/albums.services';
import { TracksService } from '../services/tracks.services';

@Injectable()
export class FavoritesService {
  artistsService = new ArtistsService();
  albumsService = new AlbumsService();
  tracksService = new TracksService();

  private readonly favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  getAll(): FavoritesCollection {
    return {
      artists: this.favorites.artists.map((id: string) =>
        this.artistsService.getArtist(id),
      ),
      albums: this.favorites.albums.map((id: string) =>
        this.albumsService.getAlbum(id),
      ),
      tracks: this.favorites.tracks.map((id: string) =>
        this.tracksService.getTrack(id),
      ),
    };
  }

  addTrackToFavs(id: string): string {
    if (this.tracksService.getTrack(id)) {
      this.favorites.tracks.push(id);
    }

    return `track ${id} was added to favorites`;
  }

  deleteTrackFromFavs(id: string): string {
    if (this.tracksService.getTrack(id)) {
      this.favorites.tracks = this.favorites.tracks.filter(
        (trackId) => id !== trackId,
      );
    }

    return `track ${id} was removed from favorites`;
  }
}

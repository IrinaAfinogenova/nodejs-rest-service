import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import {
  Favorites,
  FavoritesCollection,
} from '../interfaces/favorites.interface';
import { ArtistsService } from '../services/artists.services';
import { AlbumsService } from '../services/albums.services';
import { TracksService } from '../services/tracks.services';
import { DB } from '../db';

@Injectable()
export class FavoritesService {
  artistsService = new ArtistsService();
  albumsService = new AlbumsService();
  tracksService = new TracksService();

  private readonly favorites: Favorites = DB.favorites;

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
    if (!DB.tracks[id]) {
      throw new UnprocessableEntityException('this track does not exist');
    }

    this.favorites.tracks.push(id);

    return `track ${id} was added to favorites`;
  }

  deleteTrackFromFavs(id: string): string {
    this.favorites.tracks = this.favorites.tracks.filter(
      (trackId) => id !== trackId,
    );

    return `track ${id} was removed from favorites`;
  }

  addAlbumToFavs(id: string): string {
    if (!DB.albums[id]) {
      throw new UnprocessableEntityException('this album does not exist');
    }

    this.favorites.albums.push(id);

    return `album ${id} was added to favorites`;
  }

  deleteAlbumFromFavs(id: string): string {
    this.favorites.albums = this.favorites.albums.filter(
      (albumId) => id !== albumId,
    );

    return `album ${id} was removed from favorites`;
  }

  addArtistToFavs(id: string): string {
    if (!DB.artists[id]) {
      throw new UnprocessableEntityException('this artist does not exist');
    }

    this.favorites.artists.push(id);

    return `artist ${id} was added to favorites`;
  }

  deleteArtistFromFavs(id: string): string {
    this.favorites.artists = this.favorites.artists.filter(
      (artistId) => id !== artistId,
    );

    return `artist ${id} was removed from favorites`;
  }
}

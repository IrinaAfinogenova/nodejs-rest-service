import { v4 as uuidv4 } from 'uuid';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Album } from '../interfaces/albums.interface';
import { Track } from '../interfaces/tracks.interface';
import { DB } from '../db';

@Injectable()
export class AlbumsService {
  private readonly Albums: { [id: string]: Album } = DB.albums;

  create(AlbumInfo: Omit<Album, 'id'>): Album {
    const id = uuidv4();
    this.Albums[id] = {
      id,
      ...AlbumInfo,
    };

    return this.Albums[id];
  }

  getAll(): Album[] {
    return Object.values(this.Albums).filter(Boolean);
  }

  getAlbum(id: string): Album {
    const Album = this.Albums[id];

    if (!Album) {
      throw new NotFoundException('Album not found');
    }

    return Album;
  }

  updateAlbum(id: string, info: Omit<Album, 'id'>): Album {
    const currentAlbum = this.Albums[id];

    if (!currentAlbum) {
      throw new NotFoundException('Album not found');
    }

    this.Albums[id] = {
      ...currentAlbum,
      ...info,
      id: currentAlbum.id,
    };

    return this.Albums[id];
  }

  deleteAlbum(id): string {
    this.getAlbum(id);

    Object.values(DB.tracks)?.forEach((track) => {
      const { id, albumId } = (track || {}) as Track;

      if (albumId) {
        DB.tracks[id].albumId = null;
      }
    });

    DB.favorites.albums = DB.favorites.albums.filter(
      (albumId) => albumId !== id,
    );

    this.Albums[id] = null;

    return `Album with id ${id} was deleted`;
  }
}

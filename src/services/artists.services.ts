import { v4 as uuidv4 } from 'uuid';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Artist } from '../interfaces/artists.interface';

@Injectable()
export class ArtistsService {
  private readonly artists: { [id: string]: Artist } = {};

  create(artistInfo: Omit<Artist, 'id'>): Artist {
    const id = uuidv4();
    this.artists[id] = {
      id,
      ...artistInfo,
    };

    return this.artists[id];
  }

  getAll(): Artist[] {
    return Object.values(this.artists).filter(Boolean);
  }

  getArtist(id: string): Artist {
    const artist = this.artists[id];

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    return artist;
  }

  updateArtist(id: string, info: Omit<Artist, 'id'>): Artist {
    const currentArtist = this.artists[id];

    if (!currentArtist) {
      throw new NotFoundException('Artist not found');
    }

    this.artists[id] = {
      ...info,
      id: currentArtist.id,
    };

    return this.artists[id];
  }

  deleteArtist(id): string {
    this.getArtist(id);
    this.artists[id] = null;

    return `artist with id ${id} was deleted`;
  }
}

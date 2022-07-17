import { v4 as uuidv4 } from 'uuid';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Track } from '../interfaces/tracks.interface';
import { DB } from '../db';

@Injectable()
export class TracksService {
  private readonly tracks: { [id: string]: Track } = DB.tracks;

  create(trackInfo: Omit<Track, 'id'>): Track {
    const id = uuidv4();
    this.tracks[id] = {
      id,
      ...trackInfo,
    };

    return this.tracks[id];
  }

  getAll(): Track[] {
    return Object.values(this.tracks).filter(Boolean);
  }

  getTrack(id: string): Track {
    const track = this.tracks[id];

    if (!track) {
      throw new NotFoundException('track not found');
    }

    return track;
  }

  updateTrack(id: string, info: Omit<Track, 'id'>): Track {
    const currentTrack = this.tracks[id];

    if (!currentTrack) {
      throw new NotFoundException('Track not found');
    }

    this.tracks[id] = {
      ...info,
      id: currentTrack.id,
    };

    return this.tracks[id];
  }

  deleteTrack(id): any {
    this.getTrack(id);
    this.tracks[id] = null;

    return `track with id ${id} was deleted`;
  }
}

import {
  ParseUUIDPipe,
  Controller,
  Delete,
  Get,
  Post,
  Param,
  Body,
  Put,
} from '@nestjs/common';
import { FavoritesService } from '../services/favorites.services';
import { FavoritesCollection } from '../interfaces/favorites.interface';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getAllFavs(): FavoritesCollection {
    return this.favoritesService.getAll();
  }

  @Post('track/:id')
  addTrackToFavs(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoritesService.addTrackToFavs(id);
  }

  @Delete('track/:id')
  deleteTrackFromFavs(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favoritesService.deleteTrackFromFavs(id);
  }

  @Post('album/:id')
  addAlbumToFavs(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoritesService.addAlbumToFavs(id);
  }
}

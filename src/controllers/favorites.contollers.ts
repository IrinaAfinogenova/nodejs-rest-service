import {
  ParseUUIDPipe,
  Controller,
  HttpCode,
  Delete,
  Get,
  Post,
  Param,
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
  @HttpCode(204)
  deleteTrackFromFavs(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favoritesService.deleteTrackFromFavs(id);
  }

  @Post('album/:id')
  addAlbumToFavs(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoritesService.addAlbumToFavs(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  deleteAlbumFromFavs(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favoritesService.deleteAlbumFromFavs(id);
  }

  @Post('artist/:id')
  addArtistToFavs(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favoritesService.addArtistToFavs(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  deleteArtistFromFavs(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favoritesService.deleteArtistFromFavs(id);
  }
}

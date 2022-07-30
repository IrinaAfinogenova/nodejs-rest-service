import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controllers';
import { TrackController } from './controllers/tracks.controllers';
import { ArtistController } from './controllers/artists.controllers';
import { AlbumController } from './controllers/albums.controllers';
import { FavoritesController } from './controllers/favorites.contollers';
import { ArtistsService } from './services/artists.services';
import { UsersService } from './services/users.services';
import { TracksService } from './services/tracks.services';
import { AlbumsService } from './services/albums.services';
import { FavoritesService } from './services/favorites.services';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    AlbumController,
    UserController,
    TrackController,
    ArtistController,
    FavoritesController,
  ],
  providers: [
    AppService,
    UsersService,
    AlbumsService,
    TracksService,
    ArtistsService,
    FavoritesService,
  ],
})
export class AppModule {}

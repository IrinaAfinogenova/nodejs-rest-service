import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controllers';
import { TrackController } from './controllers/tracks.controllers';
import { ArtistController } from './controllers/artists.controllers';
import { ArtistsService } from './services/artists.services';
import { UsersService } from './services/users.services';
import { TracksService } from './services/tracks.services';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    UserController,
    TrackController,
    ArtistController,
  ],
  providers: [AppService, UsersService, TracksService, ArtistsService],
})
export class AppModule {}

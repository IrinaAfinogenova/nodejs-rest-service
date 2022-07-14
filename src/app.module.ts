import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controllers';
import { UsersService } from './services/users.services';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, UserController],
  providers: [AppService, UsersService],
})
export class AppModule {}

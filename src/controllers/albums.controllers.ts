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
import { AlbumsService } from '../services/albums.services';
import { Album } from '../interfaces/albums.interface';
import { CreateAlbumDto } from '../dto/albums.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto): Album {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  getAllTraks(): Artist[] {
    return this.artistsService.getAll();
  }

  @Get('/:id')
  getArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Artist {
    return this.artistsService.getArtist(id);
  }

  @Put('/:id')
  updateArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() artistInfo: ArtistDto,
  ): Artist {
    return this.artistsService.updateArtist(id, artistInfo);
  }

  @Delete('/:id') // TODO возвращает статус 200б а надо 204
  deleteArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): string {
    return this.artistsService.deleteArtist(id);
  }
}

import {
  ParseUUIDPipe,
  Controller,
  Delete,
  HttpCode,
  Get,
  Post,
  Param,
  Body,
  Put,
} from '@nestjs/common';
import { AlbumsService } from '../services/albums.services';
import { Album } from '../interfaces/albums.interface';
import { AlbumDto } from '../dto/albums.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  create(@Body() createAlbumDto: AlbumDto): Album {
    return this.albumsService.create(createAlbumDto);
  }

  @Get()
  getAllAlbums(): Album[] {
    return this.albumsService.getAll();
  }

  @Get('/:id')
  getAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Album {
    return this.albumsService.getAlbum(id);
  }

  @Put('/:id')
  updateAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() albumInfo: AlbumDto,
  ): Album {
    return this.albumsService.updateAlbum(id, albumInfo);
  }

  @Delete('/:id')
  @HttpCode(204)
  deleteAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): string {
    return this.albumsService.deleteAlbum(id);
  }
}

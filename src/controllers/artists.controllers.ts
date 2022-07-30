import {
  ParseUUIDPipe,
  Controller,
  HttpCode,
  Delete,
  Get,
  Post,
  Param,
  Body,
  Put,
} from '@nestjs/common';
import { ArtistsService } from '../services/artists.services';
import { Artist } from '../interfaces/artists.interface';
import { ArtistDto } from '../dto/artists.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  create(@Body() createArtistDto: ArtistDto): Artist {
    return this.artistsService.create(createArtistDto);
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

  @Delete('/:id')
  @HttpCode(204)
  deleteArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): string {
    return this.artistsService.deleteArtist(id);
  }
}

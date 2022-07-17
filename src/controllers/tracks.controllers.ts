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
import { TracksService } from '../services/tracks.services';
import { Track } from '../interfaces/tracks.interface';
import { TrackUserDto } from '../dto/track.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TracksService) {}

  @Post()
  create(@Body() createTrackDto: TrackUserDto): Track {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  getAllTraks(): Track[] {
    return this.trackService.getAll();
  }

  @Get('/:id')
  getTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Track {
    return this.trackService.getTrack(id);
  }

  @Put('/:id')
  updateTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() trackInfo: TrackUserDto,
  ): Track {
    return this.trackService.updateTrack(id, trackInfo);
  }

  @Delete('/:id') // TODO возвращает статус 200б а надо 204
  deleteTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): string {
    return this.trackService.deleteTrack(id);
  }
}

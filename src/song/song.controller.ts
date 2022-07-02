import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Patch,
  Param,
  Delete, UploadedFiles, UseInterceptors
} from '@nestjs/common';
import { SongService } from './song.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { CreateCommentDto } from "./dto/create-comment.dto";
import { ObjectId } from 'mongoose';
import {FileFieldsInterceptor} from "@nestjs/platform-express";

@Controller('api/song')
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'picture', maxCount: 1 },
    { name: 'audio', maxCount: 1 },
  ]))
  create(@UploadedFiles() files, @Body() createSongDto: CreateSongDto) {
    const {picture, audio} = files;
    return this.songService.create(createSongDto, picture[0], audio[0]);
  }

  @Get()
  findAll(@Query('limit') limit: number, @Query('page') page: number) {
    return this.songService.findAll(limit, page);
  }

  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.songService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: ObjectId, @Body() updateSongDto: UpdateSongDto) {
    return this.songService.update(id, updateSongDto);
  }

  @Delete(':id')
  remove(@Param('id') id: ObjectId) {
    return this.songService.remove(id);
  }

  @Post('comment')
  creatComment(@Body() dto: CreateCommentDto) {
    return this.songService.creatComment(dto);
  }

  @Post('listens/:id')
  listens(@Param('id') id: ObjectId) {
    return this.songService.listens(id);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { Song, SongDocument } from './schemas/song.schema';

@Injectable()
export class SongService {
  constructor(@InjectModel(Song.name) private songModel: Model<SongDocument>) {}

  async create(dto: CreateSongDto): Promise<Song> {
    const song = await this.songModel.create({ ...dto, listenings: 0 });
    return song;
  }

  async findAll(limit = 10, page = 0): Promise<Song[]> {
    const offset = page * limit;
    const songs = await this.songModel.find().skip(offset).limit(limit);
    return songs;
  }

  async findOne(id: string): Promise<Song> {
    const song = await this.songModel.findOne({ _id: id });
    return song;
  }

  update(id: number, updateSongDto: UpdateSongDto) {
    return `This action updates a #${id} song ${updateSongDto}`;
  }

  async remove(id: string): Promise<string> {
    await this.songModel.findOneAndDelete({ _id: id });
    return id;
  }
}

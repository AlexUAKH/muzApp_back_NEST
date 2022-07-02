import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { Song, SongDocument } from './schemas/song.schema';
import { Comment, CommentDocument } from "./schemas/comment.shema";
import { FileService, fileType } from "../file/file.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import {log} from "util";

@Injectable()
export class SongService {
  constructor(@InjectModel(Song.name) private songModel: Model<SongDocument>,
              @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
              private fileService: FileService) {}

  async create(dto: CreateSongDto, picture, audio): Promise<Song> {
    const picturePath = this.fileService.createFile(fileType.PICTURE, picture);
    const audioPath = this.fileService.createFile(fileType.AUDIO, audio);
    return  await this.songModel.create({ ...dto, listenings: 0, picture: picturePath, audio: audioPath });
  }

  async findAll(limit = 10, page = 0): Promise<Song[]> {
    const offset = page * limit;
    const songs = await this.songModel.find().skip(offset).limit(limit);
    return songs;
  }

  async findOne(id: ObjectId): Promise<Song> {
    const song = await this.songModel.findById(id).populate('comments');
    return song;
  }

  update(id: ObjectId, updateSongDto: UpdateSongDto) {
    return `This action updates a #${id} song ${updateSongDto}`;
  }

  async remove(id: ObjectId): Promise<ObjectId> {
    // await this.songModel.findById(id).exec( (err, song) => {
    //   console.log("song: ", song);
    //   try {
    //       if (!!song.audio) this.fileService.removeFile(song.audio);
    //       if (!!song.picture) this.fileService.removeFile(song.picture);
    //       song.comments.forEach(async comment => {
    //         await this.commentModel.findByIdAndRemove(comment);
    //       })
    //     } catch (e) {
    //       console.log(e)
    //     } finally {
    //       song.remove();
    //   }
    // })
    const song = await this.songModel.findById(id);
    try {
      this.fileService.removeFile(song.audio);
      this.fileService.removeFile(song.picture);
    } catch (e) {
      console.log(e)
    } finally {
      for (const comment of song.comments) {
        await this.commentModel.findByIdAndDelete(comment);
      }
      await this.songModel.findByIdAndDelete(id);
    }
    return id;
  }

  async creatComment(dto:CreateCommentDto): Promise<Comment> {
    const song = await this.songModel.findById(dto.song_id);
    const comment = await this.commentModel.create({...dto});
    song.comments.push(comment._id);
    await song.save();
    return comment;
  }

  async listens(id: ObjectId) {
    const song = await this.songModel.findById(id);
    song.listenings += 1;
    song.save();
    return id
  }
}

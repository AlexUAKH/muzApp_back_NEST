import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Song } from './song.schema';
import * as mongoose from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'Song' }] })
  song_id: Song;

  @Prop()
  created_at: number;

  @Prop()
  updated_at: number;

  @Prop()
  username: number;

  @Prop()
  text: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Song } from './song.schema';
import * as mongoose from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop({ type: { type: mongoose.Types.ObjectId, ref: 'Song' } })
  song_id: Song;

  @Prop({default: Date.now() })
  created_at: number;

  @Prop()
  updated_at: number;

  @Prop()
  username: string;

  @Prop()
  text: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

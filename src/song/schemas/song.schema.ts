import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Comment } from './comment.shema';
import * as mongoose from 'mongoose';

export type SongDocument = Song & Document;

@Schema()
export class Song {
  @Prop()
  title: string;

  @Prop()
  artist: string;

  @Prop()
  text: [string, null];

  @Prop()
  listenings: number;

  @Prop()
  picture: string;

  @Prop()
  audio: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
  comments: Comment[];
}

export const SongSchema = SchemaFactory.createForClass(Song);

import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { SongModule } from './song/song.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://muzadmin:2xM7OH9yBPlOK8pg@tracks.tnpcn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    ),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static')
    }),
    SongModule,
    FileModule
  ]
})
export class AppModule {}

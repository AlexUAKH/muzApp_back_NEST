import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const port = process.env.PORT || 4000;
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.listen(port, () => console.log(`Server runs on port ${port}`));
  } catch (e) {
    console.log(e);
  }
}
bootstrap();
